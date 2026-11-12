// Acciones de interfaz compartidas por las pruebas.
import { expect } from '@playwright/test';

export async function iniciarSesionUI(page, { correo, password }) {
  await page.goto('/');
  await page.locator('#correo').fill(correo);
  await page.locator('#password').fill(password);
  await page.getByRole('button', { name: 'Iniciar sesión', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1, name: 'Inicio', exact: true })).toBeVisible();
}

export async function irA(page, seccion) {
  await page
    .getByRole('navigation', { name: 'Navegación principal', exact: true })
    .getByRole('button', { name: seccion, exact: true })
    .click();
}

export async function cerrarSesionUI(page) {
  await page.locator('.sidebar-account').getByRole('button', { name: 'Cerrar sesión' }).click();
}

export async function abrirRegistroEmocional(page) {
  await irA(page, 'Mi registro emocional');
  await expect(page.getByRole('heading', { level: 1, name: 'Mi registro emocional' })).toBeVisible();
}

export async function abrirBiblioteca(page) {
  await irA(page, 'Biblioteca');
  await expect(page.getByRole('heading', { level: 1, name: 'Biblioteca de bienestar' })).toBeVisible();
}

export async function abrirAsistente(page) {
  await irA(page, 'Asistente IA');
  await expect(page.getByRole('heading', { level: 1, name: 'Chat de apoyo' })).toBeVisible();
}

export const elegirEmocion = (page, nombre) => page.getByRole('button', { name: nombre, exact: true }).click();

/** Fija la intensidad (1 a 5) del control deslizante usando el teclado. */
export async function fijarIntensidad(page, valor) {
  const slider = page.locator('#intensidad');
  await slider.focus();
  await slider.press('Home');
  for (let i = 1; i < valor; i++) await slider.press('ArrowRight');
  await expect(page.locator('#intensidad-valor')).toHaveText(`${valor} de 5`);
}

export const guardarRegistro = (page) => page.getByRole('button', { name: 'Guardar registro' }).click();

/**
 * Simula que el servidor no responde para un método y una ruta (corta la conexión).
 * Devuelve una función para restablecer la conexión normal.
 */
export async function cortarConexion(page, metodo, rutaRegex) {
  const coincide = (url) => rutaRegex.test(url.pathname);
  const manejador = (route) => (route.request().method() === metodo ? route.abort() : route.continue());
  await page.route(coincide, manejador);
  return () => page.unroute(coincide, manejador);
}

export const MSG_SIN_CONEXION = 'No se pudo conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.';
