// Atajos para preparar datos por API (rápido y sin depender de la interfaz).
// Las peticiones pasan por el proxy de Vite (/api), igual que las del navegador.
import { expect } from '@playwright/test';

export const PASSWORD = 'ClaveSegura2026!'; // 16 caracteres (mínimo del sistema: 12)

const MSG_429 =
  'El backend respondió 429 (límite de intentos de /api/auth). Inicia el backend con ' +
  'AUTH_RATE_LIMIT_MAX=10000 (Playwright lo hace solo si el backend no estaba corriendo) o espera 15 minutos.';

let secuencia = 0;
export const correoUnico = (prefijo = 'e2e') =>
  `${prefijo}.${Date.now().toString(36)}${(++secuencia).toString(36)}${Math.random().toString(36).slice(2, 6)}@tdea.edu.co`;

export const bearer = (token) => ({ Authorization: `Bearer ${token}` });

function revisar429(res) {
  if (res.status() === 429) throw new Error(MSG_429);
}

// ---------- Autenticación ----------
export async function registrarUsuario(request, { nombre = 'Ana Pérez', correo = correoUnico(), password = PASSWORD } = {}) {
  const res = await request.post('/api/auth/register', { data: { nombre, correo, password } });
  revisar429(res);
  expect(res.status(), 'registro de usuario por API').toBe(201);
  const body = await res.json();
  return { nombre, correo, password, token: body.token, idUsuario: body.user.idUsuario };
}

export async function iniciarSesionApi(request, { correo, password }) {
  const res = await request.post('/api/auth/login', { data: { correo, password } });
  revisar429(res);
  return res;
}

// ---------- Consentimiento y registro emocional ----------
export async function aceptarConsentimientoEmociones(request, token) {
  const res = await request.post('/api/consent/accept', { headers: bearer(token), data: { aceptado: true } });
  expect([200, 201]).toContain(res.status());
}

export async function crearRegistro(request, token, { emocion = 'Calma', intensidad = 3, nota } = {}) {
  const res = await request.post('/api/emotions', { headers: bearer(token), data: { emocion, intensidad, nota } });
  expect(res.status(), 'crear registro emocional por API').toBe(201);
  return (await res.json()).registro;
}

export async function listarRegistros(request, token) {
  const res = await request.get('/api/emotions', { headers: bearer(token) });
  expect(res.status()).toBe(200);
  return (await res.json()).registros;
}

// ---------- Biblioteca ----------
export async function listarBiblioteca(request, token, params = {}) {
  const qs = new URLSearchParams(params).toString();
  const res = await request.get(`/api/library${qs ? `?${qs}` : ''}`, { headers: bearer(token) });
  expect(res.status()).toBe(200);
  return (await res.json()).recursos;
}

export async function listarCategorias(request, token) {
  const res = await request.get('/api/library/categories', { headers: bearer(token) });
  expect(res.status()).toBe(200);
  return (await res.json()).categorias;
}

export async function recursosDe(request, token, emocion = 'Tristeza', minimo = 1) {
  const recursos = await listarBiblioteca(request, token, { emocion });
  expect(recursos.length, `la biblioteca debe tener lecturas de ${emocion} (¿ejecutaste los scripts SQL 01 a 07?)`).toBeGreaterThanOrEqual(minimo);
  return recursos;
}

export async function marcarFavorito(request, token, idRecurso) {
  const res = await request.post(`/api/library/${idRecurso}/favorite`, { headers: bearer(token) });
  expect(res.status()).toBe(204);
}

// ---------- Chat ----------
export async function estadoChat(request, token) {
  const res = await request.get('/api/chat/status', { headers: bearer(token) });
  expect(res.status()).toBe(200);
  return res.json();
}

export async function aceptarChat(request, token) {
  const res = await request.post('/api/chat/consent', { headers: bearer(token), data: { aceptado: true } });
  expect(res.status()).toBe(200);
}

export async function crearConversacion(request, token) {
  const res = await request.post('/api/chat/conversations', { headers: bearer(token) });
  expect(res.status(), 'crear conversación por API').toBe(201);
  return (await res.json()).conversacion.idConversacion;
}

export async function listarConversaciones(request, token) {
  const res = await request.get('/api/chat/conversations', { headers: bearer(token) });
  expect(res.status()).toBe(200);
  return (await res.json()).conversaciones;
}

export async function enviarMensajeChat(request, token, idConversacion, mensaje) {
  const res = await request.post(`/api/chat/conversations/${idConversacion}/messages`, { headers: bearer(token), data: { mensaje } });
  expect(res.status(), 'enviar mensaje al chat por API').toBe(200);
  return (await res.json()).mensajes;
}
