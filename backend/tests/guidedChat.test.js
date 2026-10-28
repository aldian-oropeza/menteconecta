import {test} from 'node:test';
import assert from 'node:assert/strict';
import {MOODS,guidedState,isGuidedChoice} from '../../shared/guidedChat.js';
import {createDemoClient} from '../src/integrations/gemini/demoClient.js';
import {libraryFilters} from '../src/validation/biblioteca/bibliotecaValidation.js';
const user=contenido=>({autor:'USUARIO',contenido});
test('cada emoción ofrece rutas válidas y una pausa con seguimiento',async()=>{
 for(const mood of MOODS) {
  let history=[user('Siento '+mood.toLowerCase())];
  const first=guidedState(history);
  assert.ok(first.options.includes('Hacer una pausa guiada'));
  history.push(user('Hacer una pausa guiada'));
  assert.ok(guidedState(history).options.includes('Me siento un poco mejor'));
  history.push(user('Me siento un poco mejor'));
  const result=guidedState(history);
  assert.match(result.text,/alivio/); assert.ok(result.options.includes('Terminar por ahora'));
  assert.equal(await createDemoClient().reply(history),result.text);
 }
});
test('las opciones del flujo tienen destino y permiten volver a empezar',()=>{
 const queue=[[]],seen=new Set();
 while(queue.length){const h=queue.shift(),state=guidedState(h);for(const choice of state.options){assert.ok(isGuidedChoice(choice),choice);if(!seen.has(choice)){seen.add(choice);queue.push([...h,user(choice)]);}}}
 assert.ok(seen.size>20);assert.equal(guidedState([user('Terminar por ahora'),user('Volver a empezar')]).options.length,6);
});
test('biblioteca conserva emoción y categoría y valida emociones',()=>{
 const f=libraryFilters({emocion:'Ansiedad',categoria:'3'});assert.equal(f.emotion,'Ansiedad');assert.equal(f.category,3);
 assert.throws(()=>libraryFilters({emocion:'inventada'}));
});

