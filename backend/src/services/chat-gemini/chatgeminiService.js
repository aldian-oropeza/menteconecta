import { AppError } from '../../utils/AppError.js';
export function createChatService(repository, provider) {
  const busy = new Set();
  const status = async user => { const s = await repository.status(user); if (!s) throw new AppError(503,'El aviso del chat no está configurado.'); return s; };
  const requireConsent = async user => { const s=await status(user); if (!s.idConsentimiento) throw new AppError(403,'Acepta el aviso del chat antes de continuar.'); return s; };
  const own = async (user,id) => { const c=await repository.find(user,id); if (!c) throw new AppError(404,'Conversación no encontrada.'); return c; };
  return {
    async status(user) { const s=await status(user); return { modo:provider.mode, disponible:provider.enabled, aviso:s.aviso + (provider.mode === 'live' ? ' En el modo conectado, tu mensaje y hasta 20 mensajes anteriores se envían a Google para generar una respuesta.' : ''), consentimiento:Boolean(s.idConsentimiento) }; },
    async accept(user) { const s=await status(user); if (!s.idConsentimiento) await repository.accept(user,s.idPolitica); return this.status(user); },
    async revoke(user) { await repository.revoke(user); },
    list: user => repository.list(user),
    async create(user) { const s=await requireConsent(user); if (!provider.enabled) throw new AppError(503,'El asistente no está activado.'); return repository.create(user,s.idConsentimiento,s.idAviso,provider.mode); },
    async messages(user,id) { await own(user,id); return repository.messages(user,id); },
    async remove(user,id) { if (busy.has(id)) throw new AppError(409,'Espera a que termine la respuesta.'); if (!await repository.remove(user,id)) throw new AppError(404,'Conversación no encontrada.'); },
    async send(user,id,message) {
      if (busy.has(id)) throw new AppError(409,'Ya hay una respuesta en curso.');
      busy.add(id);
      try {
        const c=await own(user,id), s=await requireConsent(user);
        if (c.modo!==provider.mode || c.idConsentimiento!==s.idConsentimiento || c.idAviso!==s.idAviso) throw new AppError(409,'Crea una conversación nueva para usar el modo y consentimiento actuales.');
        const history=await repository.messages(user,id);
        if (history.length>=100) throw new AppError(409,'Esta conversación llegó a su límite. Crea una nueva.');
        const reply=await provider.reply([...(provider.mode==='demo'?history:history.slice(-20)),{autor:'USUARIO',contenido:message}]);
        if (!await repository.savePair(user,id,message,reply)) throw new AppError(403,'No se guardó el mensaje porque cambió el consentimiento o la conversación.');
        return repository.messages(user,id);
      } finally { busy.delete(id); }
    }
  };
}

