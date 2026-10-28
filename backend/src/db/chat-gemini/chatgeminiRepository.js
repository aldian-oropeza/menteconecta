import { getPool, sql } from '../pool.js';
export function createChatRepository(config) {
  const req = async user => (await getPool(config)).request().input('user', sql.Int, user);
  return {
    async status(user) {
      return (await (await req(user)).query(`SELECT TOP (1) p.idPolitica, a.idAviso, a.texto AS aviso, a.vigenteDesde AS avisoDesde,
        c.idConsentimiento, c.fechaAceptacion
        FROM dbo.PoliticaPrivacidad p CROSS JOIN dbo.AvisoAsistente a
        OUTER APPLY (SELECT TOP (1) idConsentimiento, fechaAceptacion FROM dbo.ConsentimientoDatos c
          WHERE c.idUsuario=@user AND c.idPolitica=p.idPolitica AND c.finalidad=N'CONVERSACION_IA'
          AND c.aceptado=1 AND c.revocadoEn IS NULL AND c.fechaAceptacion>=a.vigenteDesde
          ORDER BY c.fechaAceptacion DESC,c.idConsentimiento DESC) c
        WHERE p.vigenteDesde<=SYSUTCDATETIME() AND (p.vigenteHasta IS NULL OR p.vigenteHasta>SYSUTCDATETIME())
          AND a.version LIKE N'chat-%' AND a.vigenteDesde<=SYSUTCDATETIME() AND (a.vigenteHasta IS NULL OR a.vigenteHasta>SYSUTCDATETIME())
        ORDER BY p.vigenteDesde DESC,p.idPolitica DESC,a.vigenteDesde DESC,a.idAviso DESC`)).recordset[0] ?? null;
    },
    async accept(user, policy) {
      await (await req(user)).input('policy', sql.Int, policy).query(`INSERT dbo.ConsentimientoDatos(idUsuario,idPolitica,finalidad,aceptado) VALUES(@user,@policy,N'CONVERSACION_IA',1)`);
    },
    async revoke(user) { await (await req(user)).query(`UPDATE dbo.ConsentimientoDatos SET revocadoEn=SYSUTCDATETIME() WHERE idUsuario=@user AND finalidad=N'CONVERSACION_IA' AND revocadoEn IS NULL`); },
    async list(user) { return (await (await req(user)).query(`SELECT TOP (100) c.idConversacion, c.fechaInicio, c.estado, c.modo,
 CASE m.contenido WHEN N'Siento tristeza' THEN N'Tristeza' WHEN N'Siento estrés' THEN N'Estrés' WHEN N'Siento ansiedad' THEN N'Ansiedad' WHEN N'Siento soledad' THEN N'Soledad' WHEN N'Siento alegría' THEN N'Alegría' WHEN N'Siento frustración' THEN N'Frustración' ELSE N'Mi espacio de bienestar' END AS titulo
 FROM dbo.ConversacionIA c OUTER APPLY (SELECT TOP (1) contenido FROM dbo.Mensaje WHERE idConversacion=c.idConversacion AND autor=N'USUARIO' ORDER BY idMensaje) m
 WHERE c.idUsuario=@user ORDER BY c.idConversacion DESC`)).recordset; },
    async create(user, consent, notice, mode) {
      return (await (await req(user)).input('consent', sql.Int, consent).input('notice', sql.Int, notice).input('mode', sql.NVarChar(10), mode).query(`INSERT dbo.ConversacionIA(idUsuario,idConsentimiento,idAviso,modo) OUTPUT INSERTED.idConversacion,INSERTED.fechaInicio,INSERTED.estado,INSERTED.modo VALUES(@user,@consent,@notice,@mode)`)).recordset[0];
    },
    async find(user, id) { return (await (await req(user)).input('id', sql.Int,id).query('SELECT idConversacion,idConsentimiento,idAviso,modo FROM dbo.ConversacionIA WHERE idConversacion=@id AND idUsuario=@user')).recordset[0] ?? null; },
    async messages(user,id) { return (await (await req(user)).input('id',sql.Int,id).query(`SELECT m.idMensaje,m.autor,m.contenido,m.creadoEn FROM dbo.Mensaje m JOIN dbo.ConversacionIA c ON c.idConversacion=m.idConversacion WHERE c.idUsuario=@user AND c.idConversacion=@id ORDER BY m.idMensaje`)).recordset; },
    async savePair(user,id,message,reply) {
      const result = await (await req(user)).input('id',sql.Int,id).input('message',sql.NVarChar(2000),message).input('reply',sql.NVarChar(sql.MAX),reply).query(`SET XACT_ABORT ON; BEGIN TRANSACTION;
        IF NOT EXISTS(SELECT 1 FROM dbo.ConversacionIA v JOIN dbo.ConsentimientoDatos c WITH (UPDLOCK,HOLDLOCK) ON c.idConsentimiento=v.idConsentimiento
          JOIN dbo.PoliticaPrivacidad p ON p.idPolitica=c.idPolitica JOIN dbo.AvisoAsistente a ON a.idAviso=v.idAviso
          WHERE v.idConversacion=@id AND v.idUsuario=@user AND c.idUsuario=@user AND c.aceptado=1 AND c.revocadoEn IS NULL
            AND c.finalidad=N'CONVERSACION_IA' AND p.vigenteDesde<=SYSUTCDATETIME() AND (p.vigenteHasta IS NULL OR p.vigenteHasta>SYSUTCDATETIME())
            AND a.vigenteDesde<=SYSUTCDATETIME() AND (a.vigenteHasta IS NULL OR a.vigenteHasta>SYSUTCDATETIME()))
          BEGIN ROLLBACK; SELECT 0 AS saved; RETURN; END;
        INSERT dbo.Mensaje(idConversacion,autor,contenido) VALUES(@id,N'USUARIO',@message),(@id,N'IA',@reply);
        COMMIT; SELECT 1 AS saved;`);
      return result.recordset[0].saved === 1;
    },
    async remove(user,id) { return (await (await req(user)).input('id',sql.Int,id).query('DELETE FROM dbo.ConversacionIA WHERE idConversacion=@id AND idUsuario=@user')).rowsAffected[0] === 1; }
  };
}
