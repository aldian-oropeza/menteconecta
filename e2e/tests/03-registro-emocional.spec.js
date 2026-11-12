// M3 - Registro emocional: RF-15, RF-16, RF-17, RF-19 | M4 - Historial: RF-20
// (El historial vive en la misma pantalla "Mi registro emocional".)
import { test, expect } from '../fixtures.js';
import { aceptarConsentimientoEmociones, bearer, crearRegistro, listarRegistros, registrarUsuario } from '../helpers/api.js';
import {
  MSG_SIN_CONEXION, abrirRegistroEmocional, cortarConexion, elegirEmocion, fijarIntensidad, guardarRegistro, iniciarSesionUI, irA
} from '../helpers/ui.js';

const SIN_REGISTROS = 'Todavía no tienes registros guardados.';
const registros = (page) => page.locator('.emotion-record');

// Todas las pruebas de este archivo parten de un usuario que ya aceptó el consentimiento.
test.beforeEach(async ({ request, usuario }) => {
  await aceptarConsentimientoEmociones(request, usuario.token);
});

async function conConsentimiento(request, usuario) {
  await aceptarConsentimientoEmociones(request, usuario.token);
  return usuario;
}

async function entrarAlFormulario(page, usuario) {
  await iniciarSesionUI(page, usuario);
  await abrirRegistroEmocional(page);
  await expect(page.getByRole('heading', { name: '¿Cómo te sientes hoy?' })).toBeVisible();
}

test.describe('RF-15 · Registro diario del estado emocional', () => {
  test('CP_069 · Registrar una emoción con intensidad, sin nota', async ({ page, usuario }) => {
    await entrarAlFormulario(page, usuario);
    await elegirEmocion(page, 'Alegría');
    await guardarRegistro(page);

    await expect(page.getByText('Registro emocional guardado.')).toBeVisible();
    await expect(registros(page)).toHaveCount(1);
    await expect(registros(page).first()).toContainText('Alegría');
    await expect(registros(page).first()).toContainText('Intensidad 3 de 5');
  });

  test('CP_070 · Registrar una emoción con observación', async ({ page, usuario }) => {
    await entrarAlFormulario(page, usuario);
    await elegirEmocion(page, 'Calma');
    await fijarIntensidad(page, 2);
    await page.locator('#nota').fill('Día tranquilo');
    await guardarRegistro(page);

    await expect(page.getByText('Registro emocional guardado.')).toBeVisible();
    await expect(registros(page).first()).toContainText('Calma');
    await expect(registros(page).first()).toContainText('Intensidad 2 de 5');
    await expect(registros(page).first()).toContainText('Día tranquilo');
  });

  test('CP_071 · Sin seleccionar emoción no se guarda el registro', async ({ page, request, usuario }) => {
    await entrarAlFormulario(page, usuario);
    await guardarRegistro(page);

    await expect(page.locator('#emocion-error')).toHaveText('Selecciona una emoción.');
    await expect(page.getByText(SIN_REGISTROS)).toBeVisible();
    expect(await listarRegistros(request, usuario.token)).toEqual([]);
  });

  test('CP_072 · API: emoción no permitida o campos extra se rechazan con 400', async ({ request, usuario }) => {
    const headers = bearer(usuario.token);
    const noPermitida = await request.post('/api/emotions', { headers, data: { emocion: 'Euforia', intensidad: 3 } });
    expect(noPermitida.status()).toBe(400);

    const conExtra = await request.post('/api/emotions', {
      headers,
      data: { emocion: 'Calma', intensidad: 3, idUsuario: 999999 }
    });
    expect(conExtra.status()).toBe(400);

    expect(await listarRegistros(request, usuario.token)).toEqual([]);
  });

  test('CP_073 · Si falla el guardado se informa y no queda un registro parcial', async ({ page, request, usuario }) => {
    await entrarAlFormulario(page, usuario);
    await cortarConexion(page, 'POST', /\/api\/emotions$/);
    await elegirEmocion(page, 'Tristeza');
    await guardarRegistro(page);

    await expect(page.getByRole('alert')).toHaveText(MSG_SIN_CONEXION);
    await expect(page.getByText(SIN_REGISTROS)).toBeVisible();
    expect(await listarRegistros(request, usuario.token)).toEqual([]);
  });
});

test.describe('RF-16 · Intensidad de la emoción', () => {
  test('CP_074 · Los valores límite 1 y 5 se aceptan', async ({ page, usuario }) => {
    await entrarAlFormulario(page, usuario);

    await elegirEmocion(page, 'Tristeza');
    await fijarIntensidad(page, 1);
    await guardarRegistro(page);
    await expect(registros(page)).toHaveCount(1);

    await elegirEmocion(page, 'Ansiedad');
    await fijarIntensidad(page, 5);
    await guardarRegistro(page);
    await expect(registros(page)).toHaveCount(2);

    await expect(registros(page).filter({ hasText: 'Tristeza' })).toContainText('Intensidad 1 de 5');
    await expect(registros(page).filter({ hasText: 'Ansiedad' })).toContainText('Intensidad 5 de 5');
  });

  test('CP_075 · API: intensidades fuera de rango o no enteras se rechazan', async ({ request, usuario }) => {
    for (const intensidad of [0, 6, 2.5, 'alta']) {
      const res = await request.post('/api/emotions', {
        headers: bearer(usuario.token),
        data: { emocion: 'Calma', intensidad }
      });
      expect(res.status(), `intensidad ${JSON.stringify(intensidad)}`).toBe(400);
      expect((await res.json()).errors.intensidad).toBeTruthy();
    }
    expect(await listarRegistros(request, usuario.token)).toEqual([]);
  });

  test('CP_077 · Si falla el almacenamiento se informa que no se pudo guardar', async ({ page, request, usuario }) => {
    await entrarAlFormulario(page, usuario);
    await cortarConexion(page, 'POST', /\/api\/emotions$/);
    await elegirEmocion(page, 'Calma');
    await fijarIntensidad(page, 4);
    await guardarRegistro(page);

    await expect(page.getByRole('alert')).toHaveText(MSG_SIN_CONEXION);
    expect(await listarRegistros(request, usuario.token)).toEqual([]);
  });
});

test.describe('RF-17 · Notas del registro emocional', () => {
  test('CP_078 · La nota queda asociada al registro y aparece en el historial', async ({ page, usuario }) => {
    await entrarAlFormulario(page, usuario);
    await elegirEmocion(page, 'Ansiedad');
    await fijarIntensidad(page, 4);
    await page.locator('#nota').fill('Examen mañana');
    await guardarRegistro(page);

    await expect(registros(page).first()).toContainText('Ansiedad');
    await expect(registros(page).first()).toContainText('Intensidad 4 de 5');
    await expect(registros(page).first()).toContainText('Examen mañana');
  });

  test('CP_079 · Una nota de exactamente 1000 caracteres se guarda completa', async ({ page, request, usuario }) => {
    const nota = 'a'.repeat(1000);
    await entrarAlFormulario(page, usuario);
    await elegirEmocion(page, 'Calma');
    await page.locator('#nota').fill(nota);
    await expect(page.locator('#nota-count')).toHaveText('1000/1000 caracteres');
    await guardarRegistro(page);

    await expect(page.getByText('Registro emocional guardado.')).toBeVisible();
    const guardados = await listarRegistros(request, usuario.token);
    expect(guardados).toHaveLength(1);
    expect(guardados[0].nota).toHaveLength(1000);
  });

  test('CP_080 · API: una nota de 1001 caracteres se rechaza', async ({ request, usuario }) => {
    const res = await request.post('/api/emotions', {
      headers: bearer(usuario.token),
      data: { emocion: 'Calma', intensidad: 3, nota: 'a'.repeat(1001) }
    });
    expect(res.status()).toBe(400);
    expect((await res.json()).errors.nota).toBeTruthy();
    expect(await listarRegistros(request, usuario.token)).toEqual([]);
  });

  test('CP_081 · Una nota con HTML se muestra como texto y no ejecuta código', async ({ page, usuario }) => {
    const nota = '<script>alert(1)</script>';
    let dialogoInesperado = false;
    page.on('dialog', (dialogo) => {
      dialogoInesperado = true;
      dialogo.dismiss();
    });

    await entrarAlFormulario(page, usuario);
    await elegirEmocion(page, 'Calma');
    await page.locator('#nota').fill(nota);
    await guardarRegistro(page);

    await expect(registros(page).first()).toContainText(nota);
    await expect(page.locator('.emotion-record script')).toHaveCount(0);
    expect(dialogoInesperado).toBe(false);
  });

  test('CP_082 · Si falla el guardado el formulario conserva lo escrito y permite reintentar', async ({ page, usuario }) => {
    await entrarAlFormulario(page, usuario);
    const restablecer = await cortarConexion(page, 'POST', /\/api\/emotions$/);
    await elegirEmocion(page, 'Tristeza');
    await page.locator('#nota').fill('Nota que no debe perderse');
    await guardarRegistro(page);

    await expect(page.getByRole('alert')).toHaveText(MSG_SIN_CONEXION);
    await expect(page.locator('#nota')).toHaveValue('Nota que no debe perderse');
    await expect(page.getByRole('button', { name: 'Tristeza', exact: true })).toHaveAttribute('aria-pressed', 'true');

    await restablecer();
    await guardarRegistro(page);
    await expect(page.getByText('Registro emocional guardado.')).toBeVisible();
    await expect(registros(page).first()).toContainText('Nota que no debe perderse');
  });
});

test.describe('RF-19 · Eliminar un registro emocional', () => {
  const MSG_CONFIRMACION = '¿Quieres eliminar este registro emocional? Esta acción no se puede deshacer.';

  test('CP_087 · Eliminar con confirmación quita el registro del historial', async ({ page, request, usuario }) => {
    await crearRegistro(request, usuario.token, { emocion: 'Tristeza', intensidad: 2, nota: 'Para borrar' });
    await iniciarSesionUI(page, usuario);
    await abrirRegistroEmocional(page);
    await expect(registros(page)).toHaveCount(1);

    page.once('dialog', async (dialogo) => {
      expect(dialogo.message()).toBe(MSG_CONFIRMACION);
      await dialogo.accept();
    });
    await page.getByRole('button', { name: 'Eliminar registro de Tristeza' }).click();

    await expect(page.getByText('Registro eliminado.')).toBeVisible();
    await expect(registros(page)).toHaveCount(0);
    await expect(page.getByText(SIN_REGISTROS)).toBeVisible();
    expect(await listarRegistros(request, usuario.token)).toEqual([]);
  });

  test('CP_088 · Cancelar la confirmación conserva el registro', async ({ page, request, usuario }) => {
    await crearRegistro(request, usuario.token, { emocion: 'Calma' });
    await iniciarSesionUI(page, usuario);
    await abrirRegistroEmocional(page);

    page.once('dialog', (dialogo) => dialogo.dismiss());
    await page.getByRole('button', { name: 'Eliminar registro de Calma' }).click();

    await expect(registros(page)).toHaveCount(1);
    await expect(page.getByText('Registro eliminado.')).toHaveCount(0);
    expect(await listarRegistros(request, usuario.token)).toHaveLength(1);
  });

  test('CP_089 · Si falla la eliminación se informa y el registro se conserva', async ({ page, request, usuario }) => {
    await crearRegistro(request, usuario.token, { emocion: 'Alegría' });
    await iniciarSesionUI(page, usuario);
    await abrirRegistroEmocional(page);
    await cortarConexion(page, 'DELETE', /\/api\/emotions\/\d+$/);

    page.once('dialog', (dialogo) => dialogo.accept());
    await page.getByRole('button', { name: 'Eliminar registro de Alegría' }).click();

    await expect(page.getByRole('alert')).toHaveText(MSG_SIN_CONEXION);
    await expect(registros(page)).toHaveCount(1);
    expect(await listarRegistros(request, usuario.token)).toHaveLength(1);
  });

  test('CP_090 · API: no se puede eliminar el registro de otro usuario', async ({ request, usuario }) => {
    const otro = await conConsentimiento(request, await registrarUsuario(request));
    const ajeno = await crearRegistro(request, otro.token, { emocion: 'Calma' });
    await crearRegistro(request, usuario.token, { emocion: 'Alegría' });

    const intento = await request.delete(`/api/emotions/${ajeno.idRegistro}`, { headers: bearer(usuario.token) });
    expect(intento.status()).toBe(404);
    expect(await listarRegistros(request, otro.token)).toHaveLength(1);

    // El propio registro sí se puede eliminar.
    const [propio] = await listarRegistros(request, usuario.token);
    const eliminado = await request.delete(`/api/emotions/${propio.idRegistro}`, { headers: bearer(usuario.token) });
    expect(eliminado.status()).toBe(204);
  });
});

test.describe('RF-20 · Consultar historial emocional', () => {
  test('CP_091 · El historial lista los registros del más reciente al más antiguo', async ({ page, request, usuario }) => {
    await crearRegistro(request, usuario.token, { emocion: 'Calma', intensidad: 2, nota: 'primera' });
    await crearRegistro(request, usuario.token, { emocion: 'Ansiedad', intensidad: 4, nota: 'segunda' });
    await iniciarSesionUI(page, usuario);
    await abrirRegistroEmocional(page);

    await expect(registros(page)).toHaveCount(2);
    await expect(registros(page).nth(0)).toContainText('Ansiedad');
    await expect(registros(page).nth(0)).toContainText('Intensidad 4 de 5');
    await expect(registros(page).nth(0)).toContainText('segunda');
    await expect(registros(page).nth(1)).toContainText('Calma');
    await expect(registros(page).nth(1)).toContainText('Intensidad 2 de 5');
    await expect(registros(page).nth(1)).toContainText('primera');
  });

  test('CP_092 · Sin registros se informa que aún no existe historial', async ({ page, usuario }) => {
    await iniciarSesionUI(page, usuario);
    await abrirRegistroEmocional(page);

    await expect(page.getByRole('heading', { name: 'Historial personal' })).toBeVisible();
    await expect(page.getByText(SIN_REGISTROS)).toBeVisible();
  });

  test('CP_093 · Si falla la carga se muestra un mensaje de error', async ({ page, usuario }) => {
    await iniciarSesionUI(page, usuario);
    await cortarConexion(page, 'GET', /\/api\/emotions$/);
    await irA(page, 'Mi registro emocional');

    await expect(page.getByRole('alert')).toHaveText(MSG_SIN_CONEXION);
  });

  test('CP_094 · API: solo se devuelven los registros del usuario autenticado', async ({ request, usuario }) => {
    const otro = await conConsentimiento(request, await registrarUsuario(request));
    const propio = await crearRegistro(request, usuario.token, { emocion: 'Calma', nota: 'mío' });
    const ajeno = await crearRegistro(request, otro.token, { emocion: 'Tristeza', nota: 'ajeno' });

    const delUsuario = await listarRegistros(request, usuario.token);
    expect(delUsuario.map((r) => r.idRegistro)).toEqual([propio.idRegistro]);
    expect(JSON.stringify(delUsuario)).not.toContain('ajeno');

    const delOtro = await listarRegistros(request, otro.token);
    expect(delOtro.map((r) => r.idRegistro)).toEqual([ajeno.idRegistro]);
  });
});
