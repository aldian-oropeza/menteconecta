// M2 - Consentimiento y privacidad: RF-04
import { test, expect } from '../fixtures.js';
import { aceptarConsentimientoEmociones, bearer, listarRegistros } from '../helpers/api.js';
import { abrirRegistroEmocional, iniciarSesionUI } from '../helpers/ui.js';

test.describe('RF-04 · Aviso de consentimiento y tratamiento de datos', () => {
  test('CP_023 · Al primer registro se muestra el aviso y, al aceptar, se habilita el formulario', async ({ page, usuario }) => {
    await iniciarSesionUI(page, usuario);
    await abrirRegistroEmocional(page);

    await expect(page.getByRole('heading', { name: 'Consentimiento para el registro emocional' })).toBeVisible();
    await expect(page.getByRole('heading', { name: '¿Cómo te sientes hoy?' })).toHaveCount(0);

    await page.getByRole('button', { name: 'Acepto y autorizo el registro emocional' }).click();

    await expect(page.getByText('Tu decisión de consentimiento quedó registrada.')).toBeVisible();
    await expect(page.getByRole('heading', { name: '¿Cómo te sientes hoy?' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Consentimiento para el registro emocional' })).toHaveCount(0);
  });

  test('CP_025 · API: el consentimiento exige confirmación explícita (aceptado: true)', async ({ request, usuario }) => {
    for (const data of [{}, { aceptado: false }, { aceptado: 'true' }]) {
      const res = await request.post('/api/consent/accept', { headers: bearer(usuario.token), data });
      expect(res.status(), `cuerpo ${JSON.stringify(data)}`).toBe(400);
    }

    const estado = await request.get('/api/consent/status', { headers: bearer(usuario.token) });
    expect((await estado.json()).consentimiento?.valido).not.toBe(true);

    const registro = await request.post('/api/emotions', { headers: bearer(usuario.token), data: { emocion: 'Calma', intensidad: 3 } });
    expect(registro.status()).toBe(403);
  });

  test('CP_026 · Con consentimiento vigente no se vuelve a mostrar el aviso', async ({ page, request, usuario }) => {
    await aceptarConsentimientoEmociones(request, usuario.token);
    await iniciarSesionUI(page, usuario);
    await abrirRegistroEmocional(page);

    await expect(page.getByRole('heading', { name: '¿Cómo te sientes hoy?' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Consentimiento para el registro emocional' })).toHaveCount(0);
  });

  test('CP_027 · API: sin consentimiento vigente no se guarda ningún registro emocional', async ({ request, usuario }) => {
    const res = await request.post('/api/emotions', { headers: bearer(usuario.token), data: { emocion: 'Calma', intensidad: 3 } });
    expect(res.status()).toBe(403);
    expect((await res.json()).message).toBe('Se requiere un consentimiento vigente para registrar emociones.');

    // Sin consentimiento aún se puede consultar el historial, que debe estar vacío.
    expect(await listarRegistros(request, usuario.token)).toEqual([]);
  });
});
