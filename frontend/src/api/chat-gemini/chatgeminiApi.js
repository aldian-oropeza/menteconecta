import { request } from '../authApi.js';
export const chatStatus=token=>request('/chat/status',{token});
export const chatConsent=(token,accept)=>request('/chat/consent',{token,method:accept?'POST':'DELETE',...(accept?{body:{aceptado:true}}:{})});
export const conversations=token=>request('/chat/conversations',{token});
export const newConversation=token=>request('/chat/conversations',{token,method:'POST'});
export const deleteConversation=(token,id)=>request(`/chat/conversations/${id}`,{token,method:'DELETE'});
export const getMessages=(token,id)=>request(`/chat/conversations/${id}/messages`,{token});
export const sendMessage=(token,id,mensaje)=>request(`/chat/conversations/${id}/messages`,{token,method:'POST',body:{mensaje}});
