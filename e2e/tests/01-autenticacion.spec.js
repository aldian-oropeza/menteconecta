// M1 - Autenticación y cuenta: RF-01, RF-02, RF-12 | M2 - RF-41 (política de privacidad)
// Los IDs CP_xxx corresponden al archivo Casos_de_prueba_MenteConecta.xlsx.
import { test, expect } from '../fixtures.js';
import { PASSWORD, correoUnico, iniciarSesionApi } from '../helpers/api.js';
import { MSG_SIN_CONEXION, cerrarSesionUI, cortarConexion, iniciarSesionUI } from '../helpers/ui.js';

async function abrirRegistro(page) {
  await page.goto('/');
  await page.getByRole('button', { name: 'Crear cuenta', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1, name: 'Crear cuenta' })).toBeVisible();
}

async function llenarRegistro(page, { nombre = 'Ana Pérez', correo = correoUnico(), password = PASSWORD, confirmacion = password, acepta = true } = {}) {
  await page.locator('#nombre').fill(nombre);
  await page.locator('#correo').fill(correo);
  await page.locator('#password').fill(password);
  await page.locator('#confirmPassword').fill(confirmacion);
  if (acepta) await page.locator('#acepta').check();
  return correo;
}

const enviarRegistro = (page) => page.getByRole('button', { name: 'Crear mi cuenta' }).click();

test.describe('RF-01 · Registro de usuario', () => {
  test('CP_001 · Registro exitoso con datos válidos', async ({ page, request }) => {
    await abrirRegistro(page);
    const correo = await llenarRegistro(page, { nombre: 'Ana Pérez' });
    await enviarRegistro(page);

    await expect(page.getByText('Cuenta creada correctamente')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1, name: 'Inicio', exact: true })).toBeVisible();
    await expect(page.getByText('Hola, Ana Pérez.')).toBeVisible();

    // La cuenta queda disponible para iniciar sesión.
    const login = await iniciarSesionApi(request, { correo, password: PASSWORD });
    expect(login.status()).toBe(200);
  });

  test('CP_002 · Nombre vacío no crea la cuenta', async ({ page, request }) => {
    await abrirRegistro(page);
    const correo = await llenarRegistro(page, { nombre: '' });
    await enviarRegistro(page);

    await expect(page.locator('#nombre-error')).toHaveText('El nombre es obligatorio.');
    await expect(page.getByRole('heading', { level: 1, name: 'Crear cuenta' })).toBeVisible();
    expect((await iniciarSesionApi(request, { correo, password: PASSWORD })).status()).toBe(401);
  });

  test('CP_003 · Correo con formato inválido', async ({ page }) => {
    await abrirRegistro(page);
    await llenarRegistro(page, { correo: 'ana.perez@' });
    await enviarRegistro(page);

    await expect(page.locator('#correo-error')).toHaveText('Escribe un correo válido.');
    await expect(page.getByRole('heading', { level: 1, name: 'Crear cuenta' })).toBeVisible();
  });

  test('CP_004 · Correo ya registrado (también con mayúsculas)', async ({ page, usuario }) => {
    await abrirRegistro(page);
    await llenarRegistro(page, { correo: usuario.correo.toUpperCase() });
    await enviarRegistro(page);

    await expect(page.locator('#correo-error')).toHaveText('Ya existe una cuenta con ese correo.');
    await expect(page.getByRole('heading', { level: 1, name: 'Crear cuenta' })).toBeVisible();
  });

  test('CP_005 · Contraseña y confirmación distintas', async ({ page }) => {
    await abrirRegistro(page);
    await llenarRegistro(page, { confirmacion: 'OtraClave2026!' });
    await enviarRegistro(page);

    await expect(page.locator('#confirmPassword-error')).toHaveText('Las contraseñas no coinciden.');
    await expect(page.getByRole('heading', { level: 1, name: 'Crear cuenta' })).toBeVisible();
  });

  test('CP_006 · Contraseña de menos de 12 caracteres', async ({ page }) => {
    await abrirRegistro(page);
    await llenarRegistro(page, { password: 'Corta123!' });
    await enviarRegistro(page);

    await expect(page.locator('#password-error')).toHaveText('Usa al menos 12 caracteres.');
    await expect(page.getByRole('heading', { level: 1, name: 'Crear cuenta' })).toBeVisible();
  });

  test('CP_007 · API: registro válido ignora idUsuario, estado y passwordHash enviados', async ({ request }) => {
    const correo = correoUnico();
    const res = await request.post('/api/auth/register', {
      data: { nombre: 'Ana Pérez', correo, password: PASSWORD, idUsuario: 999999, estado: 'DESHABILITADO', passwordHash: 'x' }
    });
    expect(res.status()).toBe(201);
    const texto = await res.text();
    const body = JSON.parse(texto);
    expect(body.user.idUsuario).not.toBe(999999);
    expect(texto).not.toMatch(/passwordHash/i);
    expect(texto).not.toContain(PASSWORD);

    // Si "estado" se hubiera aceptado, la cuenta no podría iniciar sesión.
    expect((await iniciarSesionApi(request, { correo, password: PASSWORD })).status()).toBe(200);
  });

  test('CP_008 · API: correo ya registrado responde 409', async ({ request, usuario }) => {
    for (const correo of [usuario.correo, usuario.correo.toUpperCase()]) {
      const res = await request.post('/api/auth/register', { data: { nombre: 'Otra Persona', correo, password: PASSWORD } });
      expect(res.status()).toBe(409);
      expect((await res.json()).message).toBe('Ya existe una cuenta con ese correo.');
    }
  });

  test('CP_009 · Si el servidor no responde se muestra un error y no se crea la cuenta', async ({ page, request }) => {
    await cortarConexion(page, 'POST', /\/api\/auth\/register$/);
    await abrirRegistro(page);
    const correo = await llenarRegistro(page);
    await enviarRegistro(page);

    await expect(page.getByRole('alert')).toHaveText(MSG_SIN_CONEXION);
    await expect(page.getByRole('heading', { level: 1, name: 'Crear cuenta' })).toBeVisible();
    expect((await iniciarSesionApi(request, { correo, password: PASSWORD })).status()).toBe(401);
  });
});

test.describe('RF-02 · Inicio de sesión', () => {
  const MSG_CREDENCIALES = 'Correo o contraseña incorrectos.';

  test('CP_010 · Inicio de sesión con credenciales correctas', async ({ page, usuario }) => {
    await iniciarSesionUI(page, usuario);
    await expect(page.getByText('Inicio de sesión correcto')).toBeVisible();
    await expect(page.getByText(`Hola, ${usuario.nombre}.`)).toBeVisible();
  });

  test('CP_011 · Campos vacíos', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Iniciar sesión', exact: true }).click();

    await expect(page.locator('#correo-error')).toHaveText('El correo es obligatorio.');
    await expect(page.locator('#password-error')).toHaveText('La contraseña es obligatoria.');
    await expect(page.getByRole('heading', { level: 1, name: 'Iniciar sesión' })).toBeVisible();
  });

  test('CP_012 · Contraseña incorrecta muestra mensaje genérico', async ({ page, usuario }) => {
    await page.goto('/');
    await page.locator('#correo').fill(usuario.correo);
    await page.locator('#password').fill('ContraseñaErrada123');
    await page.getByRole('button', { name: 'Iniciar sesión', exact: true }).click();

    await expect(page.getByRole('alert')).toHaveText(MSG_CREDENCIALES);
    await expect(page.getByRole('heading', { level: 1, name: 'Iniciar sesión' })).toBeVisible();
  });

  test('CP_013 · Correo inexistente muestra el mismo mensaje genérico', async ({ page }) => {
    await page.goto('/');
    await page.locator('#correo').fill(correoUnico('noexiste'));
    await page.locator('#password').fill(PASSWORD);
    await page.getByRole('button', { name: 'Iniciar sesión', exact: true }).click();

    await expect(page.getByRole('alert')).toHaveText(MSG_CREDENCIALES);
    await expect(page.getByRole('heading', { level: 1, name: 'Iniciar sesión' })).toBeVisible();
  });

  test('CP_014 · API: correo inexistente y contraseña incorrecta responden 401 con el mismo mensaje', async ({ request, usuario }) => {
    const malaClave = await iniciarSesionApi(request, { correo: usuario.correo, password: 'ContraseñaErrada123' });
    const sinCuenta = await iniciarSesionApi(request, { correo: correoUnico('noexiste'), password: PASSWORD });
    expect(malaClave.status()).toBe(401);
    expect(sinCuenta.status()).toBe(401);
    expect((await malaClave.json()).message).toBe((await sinCuenta.json()).message);
  });

  test('CP_016 · Si el servidor no responde se muestra un error de conexión', async ({ page, usuario }) => {
    await cortarConexion(page, 'POST', /\/api\/auth\/login$/);
    await page.goto('/');
    await page.locator('#correo').fill(usuario.correo);
    await page.locator('#password').fill(usuario.password);
    await page.getByRole('button', { name: 'Iniciar sesión', exact: true }).click();

    await expect(page.getByRole('alert')).toHaveText(MSG_SIN_CONEXION);
    await expect(page.getByRole('heading', { level: 1, name: 'Iniciar sesión' })).toBeVisible();
  });
});

test.describe('RF-12 · Cerrar sesión', () => {
  test('CP_056 · Cerrar sesión devuelve a la pantalla de inicio de sesión', async ({ page, usuario }) => {
    await iniciarSesionUI(page, usuario);
    await cerrarSesionUI(page);

    await expect(page.getByRole('heading', { level: 1, name: 'Iniciar sesión' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 1, name: 'Inicio', exact: true })).toHaveCount(0);

    // El token vive solo en memoria: al recargar sigue pidiendo credenciales.
    await page.reload();
    await expect(page.getByRole('heading', { level: 1, name: 'Iniciar sesión' })).toBeVisible();
  });
});

test.describe('RF-41 · Política de privacidad', () => {
  test('CP_176 · La política se puede consultar sin sesión, desde la pantalla de registro', async ({ page }) => {
    await abrirRegistro(page);
    await page.getByRole('button', { name: 'Política de privacidad' }).click();

    const dialogo = page.getByRole('dialog');
    await expect(dialogo).toBeVisible();
    await expect(dialogo.getByRole('heading', { name: 'Política de privacidad de MenteConecta' })).toBeVisible();

    await dialogo.getByRole('button', { name: 'Cerrar política' }).click();
    await expect(dialogo).toBeHidden();
  });
});
