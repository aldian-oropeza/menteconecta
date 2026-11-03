// Diagnóstico de conexión y esquema, sin modificar datos.
import { loadConfig } from '../src/config/env.js';
import { closePool, getPool } from '../src/db/pool.js';
try {
 const config=loadConfig();
 const pool=await getPool(config.db);
 const result=await pool.request().query(`SELECT DB_NAME() AS base;
 SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='dbo';
 SELECT COL_LENGTH('dbo.RecursoBienestar','emocion') AS emocion, COL_LENGTH('dbo.ConversacionIA','modo') AS modo;`);
 console.log('Conexión correcta. Base: '+result.recordsets[0][0].base);
 const names=new Set(result.recordsets[1].map(r=>r.TABLE_NAME));
 const expected=['Usuario','PoliticaPrivacidad','ConsentimientoDatos','RegistroEmocional','CategoriaRecurso','RecursoBienestar','Favorito','AvisoAsistente','ConversacionIA','Mensaje'];
 const missing=expected.filter(t=>!names.has(t));
 const columns=result.recordsets[2][0];
 if(!columns.emocion)missing.push('RecursoBienestar.emocion (script 05)');
 if(!columns.modo)missing.push('ConversacionIA.modo (script 02)');
 if(missing.length){console.error('Esquema incompleto: '+missing.join(', '));console.error('En una instalación nueva ejecuta los scripts SQL 01 al 07 en orden. En una existente aplica solo los pendientes.');process.exitCode=1;}
 else console.log('Esquema principal de autenticación, emociones, biblioteca y chat: correcto.');
} catch(err){console.error('No se pudo verificar la base: '+err.message);console.error('Revisa backend/.env, la instancia, el modo de autenticación y, si usas Windows, ODBC Driver 18.');process.exitCode=1;}
finally {await closePool();}
