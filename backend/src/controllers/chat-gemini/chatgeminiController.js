import { positiveId,validateChatMessage,validateChatConsent } from '../../validation/chat-gemini/chatgeminiValidation.js';
export function createChatController(service) { return {
  status:async(req,res)=>res.json(await service.status(req.auth.idUsuario)),
  accept:async(req,res)=>{validateChatConsent(req.body);res.json(await service.accept(req.auth.idUsuario));},
  revoke:async(req,res)=>{await service.revoke(req.auth.idUsuario);res.status(204).end();},
  list:async(req,res)=>res.json({conversaciones:await service.list(req.auth.idUsuario)}),
  create:async(req,res)=>res.status(201).json({conversacion:await service.create(req.auth.idUsuario)}),
  messages:async(req,res)=>res.json({mensajes:await service.messages(req.auth.idUsuario,positiveId(req.params.id))}),
  send:async(req,res)=>res.json({mensajes:await service.send(req.auth.idUsuario,positiveId(req.params.id),validateChatMessage(req.body))}),
  remove:async(req,res)=>{await service.remove(req.auth.idUsuario,positiveId(req.params.id));res.status(204).end();}
};}
