import { AppError } from '../../utils/AppError.js';
export { positiveId } from '../biblioteca/bibliotecaValidation.js';
export function validateChatMessage(body) {
  if (!body || Object.keys(body).some(k => k !== 'mensaje') || typeof body.mensaje !== 'string' || !body.mensaje.trim() || body.mensaje.length > 2000) throw new AppError(400, 'Escribe un mensaje de entre 1 y 2000 caracteres.');
  return body.mensaje.trim();
}
export function validateChatConsent(body) {
  if (!body || body.aceptado !== true || Object.keys(body).some(k => k !== 'aceptado')) throw new AppError(400, 'Debes aceptar expresamente el aviso del chat.');
}
