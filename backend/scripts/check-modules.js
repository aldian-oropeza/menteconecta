import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import {getPool,sql,closePool} from '../src/db/pool.js';
import {loadConfig} from '../src/config/env.js';
const base='http://127.0.0.1:5173/api';
const emails=[];
async function call(path,token,method='GET',body){const r=await fetch(base+path,{method,headers:{'Content-Type':'application/json',...(token?{Authorization:`Bearer ${token}`}:{})},...(body?{body:JSON.stringify(body)}:{})});return {status:r.status,data:await r.json().catch(()=>null)};}
async function user(){const correo=`modules-${randomUUID()}@example.com`;emails.push(correo);const r=await call('/auth/register',null,'POST',{nombre:'Prueba módulos',correo,password:randomUUID()});assert.equal(r.status,201);return r.data.token;}
try{
 const token=await user(),other=await user();
 assert.equal((await call('/library')).status,401);
 const resources=await call('/library',token);assert.equal(resources.status,200);assert.ok(resources.data.recursos.length>=4);
 const id=resources.data.recursos[0].idRecurso;
 for(const emotion of ['Tristeza','Estrés','Ansiedad','Soledad','Alegría','Frustración']) {
   const found=(await call('/library?emocion='+encodeURIComponent(emotion),token)).data.recursos;
   assert.equal(found.length,5); assert.ok(found.every(r=>r.emocion===emotion));
   assert.equal(new Set(found.map(r=>r.descripcion)).size,5);
 }

 for(const query of ['tristeza','estres','ansiedad','soledad','alegria','frustracion','práctica']) {
   const found=await call('/library?q='+encodeURIComponent(query),token);
   assert.equal(found.status,200); assert.ok(found.data.recursos.length>0,'Sin resultados: '+query);
 }
 assert.equal((await call('/library?q=zzzzsincoincidencia',token)).data.recursos.length,0);
 assert.equal((await call(`/library/${id}/favorite`,token,'POST')).status,204);
 assert.equal((await call(`/library/${id}/favorite`,token,'POST')).status,204);
 assert.equal((await call('/library?favoritos=true',token)).data.recursos.length,1);
 assert.equal((await call('/library?favoritos=true',other)).data.recursos.length,0);
 assert.equal((await call(`/library/${id}/favorite`,token,'DELETE')).status,204);
 assert.equal((await call('/help',token)).data.actividades.length,3);
 const status=await call('/chat/status',token);assert.equal(status.data.modo,'demo');assert.equal(status.data.consentimiento,false);
 assert.equal((await call('/chat/conversations',token,'POST')).status,403);
 assert.equal((await call('/chat/consent',token,'POST',{aceptado:true})).status,200);
 const created=await call('/chat/conversations',token,'POST');assert.equal(created.status,201);const cid=created.data.conversacion.idConversacion;
 assert.equal((await call(`/chat/conversations/${cid}/messages`,other)).status,404);
 const sent=await call(`/chat/conversations/${cid}/messages`,token,'POST',{mensaje:'Hola, me preocupan los exámenes'});assert.equal(sent.status,200,JSON.stringify(sent.data));assert.equal(sent.data.mensajes.length,2);assert.ok(sent.data.mensajes[1].contenido.length>40);
 assert.equal((await call(`/chat/conversations/${cid}/messages`,token)).data.mensajes.length,2);
 const moodReply=await call('/chat/conversations/'+cid+'/messages',token,'POST',{mensaje:'Siento ansiedad'});
 assert.equal(moodReply.status,200);
 const specific=await call('/chat/conversations/'+cid+'/messages',token,'POST',{mensaje:'Tengo una exposición o examen'});
 assert.equal(specific.status,200);
 assert.notEqual(specific.data.mensajes.at(-1).contenido,moodReply.data.mensajes.at(-1).contenido);
 const listed=await call('/chat/conversations',token);
 assert.equal(listed.status,200); assert.ok(listed.data.conversaciones.every(c=>c.titulo&&!/Conversación [0-9]/.test(c.titulo)));
 assert.equal((await call('/chat/consent',token,'DELETE')).status,204);
 assert.equal((await call(`/chat/conversations/${cid}/messages`,token,'POST',{mensaje:'hola'})).status,403);
 assert.equal((await call(`/chat/conversations/${cid}/messages`,token)).status,200);
 assert.equal((await call(`/chat/conversations/${cid}`,other,'DELETE')).status,404);
 assert.equal((await call(`/chat/conversations/${cid}`,token,'DELETE')).status,204);
 console.log('OK: biblioteca, favoritos privados, ayuda, consentimiento, simulación, historial, aislamiento entre usuarios y eliminación.');
}finally{try{const pool=await getPool(loadConfig().db);for(const correo of emails){await pool.request().input('correo',sql.NVarChar(254),correo).query(`SET XACT_ABORT ON; BEGIN TRANSACTION;
 DELETE c FROM dbo.ConversacionIA c JOIN dbo.Usuario u ON u.idUsuario=c.idUsuario WHERE u.correo=@correo;
 DELETE f FROM dbo.Favorito f JOIN dbo.Usuario u ON u.idUsuario=f.idUsuario WHERE u.correo=@correo;
 DELETE c FROM dbo.ConsentimientoDatos c JOIN dbo.Usuario u ON u.idUsuario=c.idUsuario WHERE u.correo=@correo;
 DELETE FROM dbo.Usuario WHERE correo=@correo; COMMIT;`);}console.log('Datos temporales de prueba eliminados.');}finally{await closePool();}}
