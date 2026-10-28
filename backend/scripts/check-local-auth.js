// Comprueba la API y SQL reales con una cuenta temporal que elimina al terminar.
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { loadConfig } from '../src/config/env.js';
import { getPool, closePool, sql } from '../src/db/pool.js';

const correo = `prueba-${randomUUID()}@example.com`;
const password = randomUUID();
const base = 'http://127.0.0.1:5173/api/auth';
async function post(path, body) {
  const response = await fetch(`${base}/${path}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
  });
  return { status: response.status, data: await response.json() };
}
try {
  const registered = await post('register', { nombre: 'Prueba local temporal', correo, password });
  assert.equal(registered.status, 201, JSON.stringify(registered.data));
  const loggedIn = await post('login', { correo, password });
  assert.equal(loggedIn.status, 200, JSON.stringify(loggedIn.data));
  const me = await fetch(`${base}/me`, { headers: { Authorization: `Bearer ${loggedIn.data.token}` } });
  assert.equal(me.status, 200);
  assert.equal((await me.json()).user.correo, correo);
  console.log('OK: registro, inicio de sesion y consulta del usuario a traves del frontend y SQL Server real.');
} finally {
  try {
    const pool = await getPool(loadConfig().db);
    await pool.request().input('correo', sql.NVarChar(254), correo)
      .query('DELETE FROM dbo.Usuario WHERE correo = @correo');
    console.log('Cuenta temporal de verificacion eliminada.');
  } finally { await closePool(); }
}
