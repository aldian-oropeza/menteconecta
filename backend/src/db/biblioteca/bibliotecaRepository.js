import { getPool, sql } from '../pool.js';
export function createLibraryRepository(config) {
  const request = async (user) => (await getPool(config)).request().input('user', sql.Int, user);
  return {
    async categories() { return (await (await getPool(config)).request().query('SELECT idCategoria, nombre, descripcion FROM dbo.CategoriaRecurso ORDER BY nombre')).recordset; },
    async list(user, { search, category, favorites, emotion = null }) {
      const req = await request(user);
      const literal = search.replace(/[\[\]%_]/g, (c) => '[' + c + ']');
      return (await req.input('emotion', sql.NVarChar(80), emotion).input('q', sql.NVarChar(302), `%${literal}%`).input('category', sql.Int, category).input('favorites', sql.Bit, favorites).query(`
        SELECT r.idRecurso, r.emocion, r.titulo, r.descripcion, r.contenido, r.duracionMinutos, c.idCategoria, c.nombre AS categoria,
          CAST(CASE WHEN f.idFavorito IS NULL THEN 0 ELSE 1 END AS BIT) AS favorito
        FROM dbo.RecursoBienestar r JOIN dbo.CategoriaRecurso c ON c.idCategoria=r.idCategoria
        LEFT JOIN dbo.Favorito f ON f.idRecurso=r.idRecurso AND f.idUsuario=@user
        WHERE r.activo=1 AND (@emotion IS NULL OR r.emocion=@emotion) AND (@category IS NULL OR r.idCategoria=@category)
          AND (r.titulo COLLATE Latin1_General_100_CI_AI LIKE @q OR r.descripcion COLLATE Latin1_General_100_CI_AI LIKE @q OR r.contenido COLLATE Latin1_General_100_CI_AI LIKE @q OR c.nombre COLLATE Latin1_General_100_CI_AI LIKE @q) AND (@favorites=0 OR f.idFavorito IS NOT NULL)
        ORDER BY r.titulo`)).recordset;
    },
    async favorite(user, id, add) {
      const req = (await request(user)).input('id', sql.Int, id);
      if (!add) { await req.query('DELETE FROM dbo.Favorito WHERE idUsuario=@user AND idRecurso=@id'); return true; }
      const result = await req.query(`SET XACT_ABORT ON; BEGIN TRANSACTION;
        IF NOT EXISTS (SELECT 1 FROM dbo.RecursoBienestar WHERE idRecurso=@id AND activo=1)
          BEGIN ROLLBACK; SELECT 0 AS found; RETURN; END;
        IF NOT EXISTS (SELECT 1 FROM dbo.Favorito WITH (UPDLOCK,HOLDLOCK) WHERE idUsuario=@user AND idRecurso=@id)
          INSERT dbo.Favorito(idUsuario,idRecurso) VALUES(@user,@id);
        COMMIT; SELECT 1 AS found;`);
      return result.recordset[0].found === 1;
    }
  };
}
