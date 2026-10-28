import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createDemoClient} from '../src/integrations/gemini/demoClient.js';
const client=createDemoClient();
const user=contenido=>({autor:'USUARIO',contenido});
test('estrés sin tilde y seguimiento breve mantienen el tema',async()=>{
 const first=await client.reply([user('tengo mucho estres')]);
 assert.match(first,/estudio/);
 const next=await client.reply([user('tengo mucho estres'),{autor:'IA',contenido:first},user('el estudio')]);
 assert.notEqual(next,first);assert.match(next,/primera acción/);
 const third=await client.reply([user('tengo mucho estres'),{autor:'IA',contenido:first},user('el estudio'),{autor:'IA',contenido:next},user('no sé')]);
 assert.match(third,/abrir el material/);
});
test('no confunde no me siento bien con alegría y explica sus límites',async()=>{
 assert.doesNotMatch(await client.reply([user('no me siento bien')]),/Qué agradable/);
 assert.match(await client.reply([user('eres Gemini?')]),/demostración/);
});
test('prioriza petición urgente frente a estudio y no usa prefijos repetitivos',async()=>{
 assert.match(await client.reply([user('por los exámenes no quiero vivir')]),/urgencias/);
 assert.doesNotMatch(await client.reply([user('estoy triste')]),/respuesta predefinida/);
});
test('conversaciones independientes no comparten contexto',async()=>{
 const a=await client.reply([user('me siento triste')]);
 await client.reply([user('tengo estres')]);
 assert.equal(await client.reply([user('me siento triste')]),a);
});

