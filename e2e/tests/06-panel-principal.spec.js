// M10 - Panel principal: RF-42
import { test, expect } from '../fixtures.js';
import { iniciarSesionUI, irA } from '../helpers/ui.js';

test.describe('RF-42 · Panel principal de bienestar', () => {
  test('CP_179 · El panel muestra los accesos a las funciones principales', async ({ page, usuario }) => {
    await iniciarSesionUI(page, usuario);

    await expect(page.getByText(`Hola, ${usuario.nombre}. Este es tu espacio de bienestar.`)).toBeVisible();
    for (const acceso of [
      'Registrar cómo me siento', // registro emocional
      'Ver mi historial', // historial
      'Explorar biblioteca', // biblioteca de bienestar
      'Explorar ejercicios', // ayuda interactiva
      'Abrir conversación' // asistente IA
    ]) {
      await expect(page.getByRole('button', { name: acceso, exact: true })).toBeVisible();
    }
  });

  test('CP_180 · Cada acceso del panel lleva a su módulo', async ({ page, usuario }) => {
    await iniciarSesionUI(page, usuario);
    const titulo = (nombre) => page.getByRole('heading', { level: 1, name: nombre });
    const volverAlInicio = async () => {
      await irA(page, 'Inicio');
      await expect(titulo('Inicio')).toBeVisible();
    };

    await page.getByRole('button', { name: 'Registrar cómo me siento', exact: true }).click();
    await expect(titulo('Mi registro emocional')).toBeVisible();
    await volverAlInicio();

    await page.getByRole('button', { name: 'Ver mi historial', exact: true }).click();
    await expect(titulo('Mi registro emocional')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Historial personal' })).toBeVisible();
    await volverAlInicio();

    await page.getByRole('button', { name: 'Explorar biblioteca', exact: true }).click();
    await expect(titulo('Biblioteca de bienestar')).toBeVisible();
    await volverAlInicio();

    await page.getByRole('button', { name: 'Explorar ejercicios', exact: true }).click();
    await expect(titulo('Ayuda interactiva')).toBeVisible();
    await volverAlInicio();

    await page.getByRole('button', { name: 'Abrir conversación', exact: true }).click();
    await expect(titulo('Chat de apoyo')).toBeVisible();
  });

  test('CP_182 · Con la sesión vencida el sistema dirige al inicio de sesión', async ({ page, usuario }) => {
    await page.route(
      (url) => url.pathname === '/api/auth/me',
      (route) => route.fulfill({ status: 401, contentType: 'application/json', body: JSON.stringify({ message: 'Sesión no válida o vencida.' }) })
    );
    await page.goto('/');
    await page.locator('#correo').fill(usuario.correo);
    await page.locator('#password').fill(usuario.password);
    await page.getByRole('button', { name: 'Iniciar sesión', exact: true }).click();

    await expect(page.getByRole('heading', { level: 1, name: 'Iniciar sesión' })).toBeVisible();
    await expect(page.getByText('Tu sesión venció. Inicia sesión de nuevo.')).toBeVisible();
  });
});
