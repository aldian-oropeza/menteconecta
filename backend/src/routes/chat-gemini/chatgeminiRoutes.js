import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { createAuthenticate } from '../../middleware/authenticate.js';
import { createChatController } from '../../controllers/chat-gemini/chatgeminiController.js';
export function createChatRouter(auth,service) {
  const r=Router(), c=createChatController(service), wrap=fn=>(req,res,next)=>Promise.resolve(fn(req,res)).catch(next);
  r.use(createAuthenticate(auth));
  const limit=rateLimit({windowMs:15*60*1000,limit:30,keyGenerator:req=>String(req.auth.idUsuario),standardHeaders:true,legacyHeaders:false,message:{message:'Llegaste al límite de mensajes. Inténtalo en unos minutos.'}});
  r.get('/status',wrap(c.status));r.post('/consent',wrap(c.accept));r.delete('/consent',wrap(c.revoke));
  r.get('/conversations',wrap(c.list));r.post('/conversations',wrap(c.create));r.delete('/conversations/:id',wrap(c.remove));
  r.get('/conversations/:id/messages',wrap(c.messages));r.post('/conversations/:id/messages',limit,wrap(c.send));return r;
}
