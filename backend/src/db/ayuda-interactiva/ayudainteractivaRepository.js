import { getPool } from '../pool.js';
export function createHelpRepository(config) {
  return { async list() { return (await (await getPool(config)).request().query(`SELECT idRecursoAyuda, nombre, telefono, url, descripcion, ambitoGeografico, verificadoEn FROM dbo.RecursoAyuda WHERE activo=1 ORDER BY nombre`)).recordset; } };
}
