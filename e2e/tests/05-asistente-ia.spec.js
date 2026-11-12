// M9 - Asistente virtual con IA (modo demo): RF-09, RF-10, RF-36, RF-37, RF-38
// En modo demo el chat es guiado: se elige una opción (botón) en lugar de escribir texto libre.
import { test, expect } from '../fixtures.js';
import {
  aceptarChat, bearer, crearConversacion, enviarMensajeChat, estadoChat, listarConversaciones, registrarUsuario
} from '../helpers/api.js';
import { MSG_SIN_CONEXION, abrirAsistente, cortarConexion, iniciarSesionUI, irA } from '../helpers/ui.js';

const conversaciones = (page) => page.locator('.chat-sidebar li button');
const mensajesDelUsuario = (page) => page.getByRole('log').locator('article.mine');
const respuestasDelAsistente = (page) => page.getByRole('log').locator('article.assistant');
const nuevaConversacion = (page) => page.getByRole('button', { name: 'Nueva conversación' });
const SIN_HISTORIAL = 'Tu historial aparecerá aquí.';
const SIN_SELECCION = 'Crea una conversación o selecciona una del historial.';

test.beforeEach(async ({ request, usuario }) => {
  const estado = await estadoChat(request, usuario.token);
  test.skip(estado.modo !== 'demo' || !estado.disponible, 'Estas pruebas requieren GEMINI_MODE=demo.');
});

async function entrarAlChat(page, usuario) {
  await iniciarSesionUI(page, usuario);
  await abrirAsistente(page);
}

test.describe('RF-10 · Advertencia sobre las limitaciones del asistente', () => {
  test('CP_050 · El aviso se muestra antes de comenzar y al aceptarlo se habilita la conversación', async ({ page, usuario }) => {
    await entrarAlChat(page, usuario);

    await expect(page.getByRole('heading', { name: 'Antes de comenzar' })).toBeVisible();
    await expect(nuevaConversacion(page)).toBeDisabled();

    await page.getByLabel('He leído el aviso y acepto el uso del chat descrito.').check();
    await page.getByRole('button', { name: 'Aceptar y continuar' }).click();

    await expect(page.getByRole('heading', { name: 'Antes de comenzar' })).toHaveCount(0);
    await expect(page.getByText('Aviso y consentimiento del chat')).toBeVisible();
    await expect(nuevaConversacion(page)).toBeEnabled();
  });

  test('CP_051 · Sin aceptar el aviso la conversación queda bloqueada', async ({ page, request, usuario }) => {
    await entrarAlChat(page, usuario);

    await expect(page.getByRole('button', { name: 'Aceptar y continuar' })).toBeDisabled();
    await expect(nuevaConversacion(page)).toBeDisabled();

    // Tampoco se puede crear una conversación por API sin aceptar el aviso.
    const res = await request.post('/api/chat/conversations', { headers: bearer(usuario.token) });
    expect(res.status()).toBe(403);
    expect(await listarConversaciones(request, usuario.token)).toEqual([]);
  });
});

test.describe('RF-09 · Asistente virtual de bienestar emocional', () => {
  test('CP_044 · Elegir una opción guiada devuelve una respuesta del asistente', async ({ page, request, usuario }) => {
    await aceptarChat(request, usuario.token);
    await entrarAlChat(page, usuario);
    await nuevaConversacion(page).click();
    await expect(page.getByText('¿Cómo te sientes hoy? Elige una emoción entre las opciones de abajo.')).toBeVisible();

    await page.getByRole('button', { name: 'Siento tristeza', exact: true }).click();

    await expect(mensajesDelUsuario(page)).toHaveCount(1);
    await expect(mensajesDelUsuario(page).first()).toContainText('Siento tristeza');
    await expect(respuestasDelAsistente(page)).toHaveCount(1);
    await expect(respuestasDelAsistente(page).first().locator('p')).not.toBeEmpty();
    await expect(page.getByRole('button', { name: 'Comprender lo que siento', exact: true })).toBeVisible();
  });

  test('CP_049 · Si falla el servicio se informa, no se guardan mensajes parciales y se puede reintentar', async ({ page, request, usuario }) => {
    await aceptarChat(request, usuario.token);
    const idConversacion = await crearConversacion(request, usuario.token);
    await entrarAlChat(page, usuario);
    await conversaciones(page).first().click();
    const restablecer = await cortarConexion(page, 'POST', /\/api\/chat\/conversations\/\d+\/messages$/);

    await page.getByRole('button', { name: 'Siento ansiedad', exact: true }).click();

    await expect(page.getByRole('alert')).toHaveText(MSG_SIN_CONEXION);
    await expect(mensajesDelUsuario(page)).toHaveCount(0);
    const guardados = await request.get(`/api/chat/conversations/${idConversacion}/messages`, { headers: bearer(usuario.token) });
    expect((await guardados.json()).mensajes).toEqual([]);

    await restablecer();
    await page.getByRole('button', { name: 'Siento ansiedad', exact: true }).click();
    await expect(mensajesDelUsuario(page)).toHaveCount(1);
    await expect(respuestasDelAsistente(page)).toHaveCount(1);
  });
});

test.describe('RF-36 · Historial de conversaciones con IA', () => {
  test('CP_154 · Se listan las conversaciones y se abre una con sus mensajes', async ({ page, request, usuario }) => {
    await aceptarChat(request, usuario.token);
    const id = await crearConversacion(request, usuario.token);
    await enviarMensajeChat(request, usuario.token, id, 'Siento alegría');
    await entrarAlChat(page, usuario);

    await expect(conversaciones(page)).toHaveCount(1);
    await conversaciones(page).first().click();

    await expect(mensajesDelUsuario(page)).toHaveCount(1);
    await expect(mensajesDelUsuario(page).first()).toContainText('Siento alegría');
    await expect(respuestasDelAsistente(page)).toHaveCount(1);
  });

  test('CP_155 · Sin conversaciones se informa que el historial está vacío', async ({ page, usuario }) => {
    await entrarAlChat(page, usuario);

    await expect(page.getByText(SIN_HISTORIAL)).toBeVisible();
    await expect(conversaciones(page)).toHaveCount(0);
  });

  test('CP_156 · Si falla la carga del historial se muestra un mensaje de error', async ({ page, usuario }) => {
    await iniciarSesionUI(page, usuario);
    await cortarConexion(page, 'GET', /\/api\/chat\/conversations$/);
    await irA(page, 'Asistente IA');

    await expect(page.getByRole('alert')).toHaveText(MSG_SIN_CONEXION);
  });

  test('CP_157 · API: no se pueden leer los mensajes de una conversación ajena', async ({ request, usuario }) => {
    const otro = await registrarUsuario(request);
    await aceptarChat(request, otro.token);
    const idAjena = await crearConversacion(request, otro.token);
    await enviarMensajeChat(request, otro.token, idAjena, 'Siento soledad');

    const res = await request.get(`/api/chat/conversations/${idAjena}/messages`, { headers: bearer(usuario.token) });
    expect(res.status()).toBe(404);
    expect(await res.text()).not.toContain('Siento soledad');
  });
});

test.describe('RF-37 · Nueva conversación con el asistente', () => {
  test('CP_158 · Una conversación nueva empieza sin el contexto de la anterior', async ({ page, request, usuario }) => {
    await aceptarChat(request, usuario.token);
    const id = await crearConversacion(request, usuario.token);
    await enviarMensajeChat(request, usuario.token, id, 'Siento tristeza');
    await entrarAlChat(page, usuario);
    await conversaciones(page).first().click();
    await expect(mensajesDelUsuario(page)).toHaveCount(1);

    await nuevaConversacion(page).click();

    await expect(conversaciones(page)).toHaveCount(2);
    await expect(mensajesDelUsuario(page)).toHaveCount(0);
    await expect(page.getByText('¿Cómo te sientes hoy? Elige una emoción entre las opciones de abajo.')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Siento tristeza', exact: true })).toBeVisible();
  });

  test('CP_161 · Si falla la creación se mantiene disponible la conversación actual', async ({ page, request, usuario }) => {
    await aceptarChat(request, usuario.token);
    await crearConversacion(request, usuario.token);
    await entrarAlChat(page, usuario);
    await conversaciones(page).first().click();
    await expect(page.getByRole('button', { name: 'Eliminar' })).toBeVisible();
    await cortarConexion(page, 'POST', /\/api\/chat\/conversations$/);

    await nuevaConversacion(page).click();

    await expect(page.getByRole('alert')).toHaveText(MSG_SIN_CONEXION);
    await expect(conversaciones(page)).toHaveCount(1);
    await expect(page.getByRole('button', { name: 'Eliminar' })).toBeVisible();
    expect(await listarConversaciones(request, usuario.token)).toHaveLength(1);
  });
});

test.describe('RF-38 · Eliminar una conversación del historial', () => {
  const MSG_CONFIRMACION = '¿Eliminar esta conversación y todos sus mensajes?';

  async function conUnaConversacion(page, request, usuario) {
    await aceptarChat(request, usuario.token);
    const id = await crearConversacion(request, usuario.token);
    await enviarMensajeChat(request, usuario.token, id, 'Siento estrés');
    await entrarAlChat(page, usuario);
    await conversaciones(page).first().click();
    await expect(mensajesDelUsuario(page)).toHaveCount(1);
    return id;
  }

  test('CP_162 · Eliminar con confirmación quita la conversación y sus mensajes', async ({ page, request, usuario }) => {
    await conUnaConversacion(page, request, usuario);

    page.once('dialog', async (dialogo) => {
      expect(dialogo.message()).toBe(MSG_CONFIRMACION);
      await dialogo.accept();
    });
    await page.getByRole('button', { name: 'Eliminar' }).click();

    await expect(page.getByText(SIN_HISTORIAL)).toBeVisible();
    await expect(page.getByText(SIN_SELECCION)).toBeVisible();
    expect(await listarConversaciones(request, usuario.token)).toEqual([]);
  });

  test('CP_163 · Cancelar la confirmación conserva la conversación', async ({ page, request, usuario }) => {
    await conUnaConversacion(page, request, usuario);

    page.once('dialog', (dialogo) => dialogo.dismiss());
    await page.getByRole('button', { name: 'Eliminar' }).click();

    await expect(conversaciones(page)).toHaveCount(1);
    await expect(mensajesDelUsuario(page)).toHaveCount(1);
    expect(await listarConversaciones(request, usuario.token)).toHaveLength(1);
  });

  test('CP_164 · Si falla la eliminación se informa y la conversación se conserva', async ({ page, request, usuario }) => {
    await conUnaConversacion(page, request, usuario);
    await cortarConexion(page, 'DELETE', /\/api\/chat\/conversations\/\d+$/);

    page.once('dialog', (dialogo) => dialogo.accept());
    await page.getByRole('button', { name: 'Eliminar' }).click();

    await expect(page.getByRole('alert')).toHaveText(MSG_SIN_CONEXION);
    await expect(conversaciones(page)).toHaveCount(1);
    expect(await listarConversaciones(request, usuario.token)).toHaveLength(1);
  });

  test('CP_165 · API: no se puede eliminar la conversación de otro usuario', async ({ request, usuario }) => {
    const otro = await registrarUsuario(request);
    await aceptarChat(request, otro.token);
    const idAjena = await crearConversacion(request, otro.token);

    const res = await request.delete(`/api/chat/conversations/${idAjena}`, { headers: bearer(usuario.token) });
    expect(res.status()).toBe(404);
    expect(await listarConversaciones(request, otro.token)).toHaveLength(1);
  });
});
