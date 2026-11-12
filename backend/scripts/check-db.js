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
 const expected=['RecursoAyuda','Emocion','Usuario','PoliticaPrivacidad','ConsentimientoDatos','RegistroEmocional','CategoriaRecurso','RecursoBienestar','Favorito','AvisoAsistente','ConversacionIA','Mensaje'];
 const missing=expected.filter(t=>!names.has(t));
 const columns=result.recordsets[2][0];
 if(!columns.emocion)missing.push('RecursoBienestar.emocion (script 05)');
 if(!columns.modo)missing.push('ConversacionIA.modo (script 02)');
 if(missing.length){console.error('Esquema incompleto: '+missing.join(', '));console.error('En una instalación nueva ejecuta los scripts SQL 01 al 07 en orden. En una existente aplica solo los pendientes.');process.exitCode=1;}
  else {
  const counts=(await pool.request().query(`SELECT
    (SELECT COUNT(*) FROM dbo.RecursoBienestar WHERE activo=1) AS lecturas,
    (SELECT COUNT(*) FROM dbo.RecursoBienestar WHERE activo=1 AND emocion IS NOT NULL) AS lecturasPorEmocion,
    (SELECT COUNT(*) FROM dbo.CategoriaRecurso) AS categorias,
    (SELECT COUNT(*) FROM dbo.RecursoAyuda WHERE activo=1) AS contactosOpcionales,
    (SELECT COUNT(*) FROM dbo.PoliticaPrivacidad WHERE vigenteDesde<=SYSUTCDATETIME() AND (vigenteHasta IS NULL OR vigenteHasta>SYSUTCDATETIME())) AS politicas,
    (SELECT COUNT(*) FROM dbo.AvisoAsistente WHERE version LIKE N'chat-%' AND vigenteDesde<=SYSUTCDATETIME() AND (vigenteHasta IS NULL OR vigenteHasta>SYSUTCDATETIME())) AS avisosChat;`)).recordset[0];
  console.log('Esquema de los módulos: correcto.');
  console.table(counts);
  const issues=[];
  if(!counts.categorias || !counts.lecturas) issues.push('Biblioteca sin categorías o lecturas: revisar la carga inicial y scripts 03 al 07.');
  if(counts.lecturasPorEmocion<30) issues.push('Contenido por emoción incompleto: revisar scripts 05 al 07.');
  if(!counts.politicas) issues.push('Falta una política vigente para habilitar los consentimientos (script 01).');
  if(!counts.avisosChat) issues.push('Falta un aviso chat vigente (script 02); el chatbot no puede iniciarse.');
  if(config.gemini.mode!=='demo') issues.push('Esta instalación debe usar GEMINI_MODE=demo para el chatbot simulado.');
  if(issues.length){issues.forEach(message=>console.error(message));process.exitCode=1;}
  else console.log('Datos básicos de biblioteca y chatbot: correctos.');
  console.log('Ayuda incluye 3 actividades en el código. Cero contactos opcionales NO impide mostrarlas.');
  console.log('Biblioteca: selecciona una emoción o categoría y desmarca Solo mis favoritos para consultar lecturas.');
 }
} catch(err){console.error('No se pudo verificar la base: '+err.message);console.error('Revisa backend/.env, la instancia, el modo de autenticación y, si usas Windows, ODBC Driver 18.');process.exitCode=1;}
finally {await closePool();}
