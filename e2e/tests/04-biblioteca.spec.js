// M8 - Biblioteca de bienestar: RF-07, RF-08, RF-31, RF-32, RF-33
// En el desarrollo actual la biblioteca se explora por Emoción y/o Categoría (no hay buscador de texto).
import { test, expect } from '../fixtures.js';
import { listarBiblioteca, listarCategorias, marcarFavorito, recursosDe, registrarUsuario } from '../helpers/api.js';
import { MSG_SIN_CONEXION, abrirBiblioteca, cortarConexion, iniciarSesionUI } from '../helpers/ui.js';

const filtroEmocion = (page) => page.locator('.library-filters select').nth(0);
const filtroCategoria = (page) => page.locator('.library-filters select').nth(1);
const soloFavoritos = (page) => page.getByLabel('Solo mis favoritos');
const tarjetas = (page) => page.locator('.resource-card');
const tarjetaDe = (page, titulo) =>
  tarjetas(page).filter({ has: page.getByRole('heading', { name: titulo, exact: true }) });

async function entrarABiblioteca(page, usuario) {
  await iniciarSesionUI(page, usuario);
  await abrirBiblioteca(page);
}

test.describe('RF-07 · Biblioteca de ejercicios de bienestar', () => {
  test('CP_037 · Al elegir una emoción se muestran las lecturas disponibles', async ({ page, request, usuario }) => {
    const esperadas = await recursosDe(request, usuario.token, 'Tristeza');
    await entrarABiblioteca(page, usuario);
    await expect(page.getByRole('heading', { name: 'Elige un tema para comenzar' })).toBeVisible();

    await filtroEmocion(page).selectOption('Tristeza');

    await expect(tarjetas(page)).toHaveCount(esperadas.length);
    await expect(page.getByText(`${esperadas.length} lectura(s)`)).toBeVisible();
  });

  test('CP_038 · Abrir una lectura muestra su contenido', async ({ page, request, usuario }) => {
    await recursosDe(request, usuario.token, 'Tristeza');
    await entrarABiblioteca(page, usuario);
    await filtroEmocion(page).selectOption('Tristeza');

    const primera = tarjetas(page).first();
    await primera.getByRole('button', { name: 'Abrir lectura' }).click();

    await expect(primera.locator('.resource-content')).toBeVisible();
    await expect(primera.getByRole('button', { name: 'Cerrar lectura' })).toBeVisible();
  });

  test('CP_040 · Si falla la carga se muestra un mensaje de error', async ({ page, usuario }) => {
    await entrarABiblioteca(page, usuario);
    await cortarConexion(page, 'GET', /\/api\/library$/);

    await filtroEmocion(page).selectOption('Tristeza');

    await expect(page.getByRole('alert')).toHaveText(MSG_SIN_CONEXION);
  });
});

test.describe('RF-08 · Consultar recursos por categorías', () => {
  test('CP_041 · Se muestran las categorías disponibles', async ({ page, request, usuario }) => {
    const categorias = await listarCategorias(request, usuario.token);
    expect(categorias.length).toBeGreaterThan(0);
    await entrarABiblioteca(page, usuario);

    // La primera opción es «Ninguna»; el resto son las categorías de la base de datos.
    await expect(filtroCategoria(page).locator('option')).toHaveCount(categorias.length + 1);
    for (const { nombre } of categorias) {
      await expect(filtroCategoria(page).locator('option', { hasText: nombre })).toHaveCount(1);
    }
  });

  test('CP_042 · Al elegir una categoría solo se muestran sus recursos', async ({ page, request, usuario }) => {
    let elegida = null;
    let recursos = [];
    for (const categoria of await listarCategorias(request, usuario.token)) {
      recursos = await listarBiblioteca(request, usuario.token, { categoria: String(categoria.idCategoria) });
      if (recursos.length > 0) {
        elegida = categoria;
        break;
      }
    }
    test.skip(!elegida, 'Ninguna categoría tiene lecturas activas en esta base de datos.');

    await entrarABiblioteca(page, usuario);
    await filtroCategoria(page).selectOption(String(elegida.idCategoria));

    await expect(tarjetas(page)).toHaveCount(recursos.length);
    await expect(page.getByText(`en ${elegida.nombre}`)).toBeVisible();
    await tarjetas(page).first().getByRole('button', { name: 'Abrir lectura' }).click();
    await expect(tarjetas(page).first().locator('.resource-content')).toBeVisible();
  });
});

test.describe('RF-31 · Guardar recursos como favoritos', () => {
  test('CP_137 · Guardar una lectura la marca como favorita', async ({ page, request, usuario }) => {
    const [recurso] = await recursosDe(request, usuario.token, 'Tristeza');
    await entrarABiblioteca(page, usuario);
    await filtroEmocion(page).selectOption('Tristeza');

    const tarjeta = tarjetaDe(page, recurso.titulo);
    await tarjeta.getByRole('button', { name: '☆ Guardar' }).click();

    await expect(tarjeta.getByRole('button', { name: '★ Guardado' })).toHaveAttribute('aria-pressed', 'true');
    const favoritos = await listarBiblioteca(request, usuario.token, { favoritos: 'true' });
    expect(favoritos.map((r) => r.idRecurso)).toEqual([recurso.idRecurso]);
  });

  test('CP_139 · Si falla el guardado se informa y la lectura no queda como favorita', async ({ page, request, usuario }) => {
    const [recurso] = await recursosDe(request, usuario.token, 'Tristeza');
    await entrarABiblioteca(page, usuario);
    await filtroEmocion(page).selectOption('Tristeza');
    await cortarConexion(page, 'POST', /\/api\/library\/\d+\/favorite$/);

    const tarjeta = tarjetaDe(page, recurso.titulo);
    await tarjeta.getByRole('button', { name: '☆ Guardar' }).click();

    await expect(page.getByRole('alert')).toHaveText(MSG_SIN_CONEXION);
    await expect(tarjeta.getByRole('button', { name: '☆ Guardar' })).toBeVisible();
    expect(await listarBiblioteca(request, usuario.token, { favoritos: 'true' })).toEqual([]);
  });

  test('CP_140 · API: guardar un favorito sin token responde 401 y no guarda nada', async ({ request, usuario }) => {
    const [recurso] = await recursosDe(request, usuario.token, 'Tristeza');

    const res = await request.post(`/api/library/${recurso.idRecurso}/favorite`);
    expect(res.status()).toBe(401);
    expect(await listarBiblioteca(request, usuario.token, { favoritos: 'true' })).toEqual([]);
  });
});

test.describe('RF-32 · Consultar recursos favoritos', () => {
  test('CP_141 · «Solo mis favoritos» lista las lecturas guardadas y permite abrirlas', async ({ page, request, usuario }) => {
    const [a, b] = await recursosDe(request, usuario.token, 'Tristeza', 2);
    await marcarFavorito(request, usuario.token, a.idRecurso);
    await marcarFavorito(request, usuario.token, b.idRecurso);
    await entrarABiblioteca(page, usuario);

    await soloFavoritos(page).check();

    await expect(tarjetas(page)).toHaveCount(2);
    await expect(tarjetaDe(page, a.titulo)).toBeVisible();
    await expect(tarjetaDe(page, b.titulo)).toBeVisible();
    await expect(page.getByRole('button', { name: '★ Guardado' })).toHaveCount(2);

    await tarjetaDe(page, a.titulo).getByRole('button', { name: 'Abrir lectura' }).click();
    await expect(tarjetaDe(page, a.titulo).locator('.resource-content')).toBeVisible();
  });

  test('CP_142 · Sin favoritos se informa que la lista está vacía', async ({ page, usuario }) => {
    await entrarABiblioteca(page, usuario);

    await soloFavoritos(page).check();

    await expect(page.getByText(/No tienes lecturas guardadas/)).toBeVisible();
    await expect(tarjetas(page)).toHaveCount(0);
  });

  test('CP_144 · API: los favoritos son solo del usuario autenticado', async ({ request, usuario }) => {
    const otro = await registrarUsuario(request);
    const [recurso] = await recursosDe(request, usuario.token, 'Tristeza');
    await marcarFavorito(request, usuario.token, recurso.idRecurso);

    const propios = await listarBiblioteca(request, usuario.token, { favoritos: 'true' });
    expect(propios.map((r) => r.idRecurso)).toEqual([recurso.idRecurso]);
    expect(await listarBiblioteca(request, otro.token, { favoritos: 'true' })).toEqual([]);

    // Para el otro usuario la misma lectura aparece sin marcar como favorita.
    const vistaDelOtro = (await listarBiblioteca(request, otro.token, { emocion: 'Tristeza' })).find((r) => r.idRecurso === recurso.idRecurso);
    expect(vistaDelOtro.favorito).toBeFalsy();
  });
});

test.describe('RF-33 · Eliminar recurso de favoritos', () => {
  test('CP_145 · Quitar un favorito lo retira de la lista', async ({ page, request, usuario }) => {
    const [recurso] = await recursosDe(request, usuario.token, 'Tristeza');
    await marcarFavorito(request, usuario.token, recurso.idRecurso);
    await entrarABiblioteca(page, usuario);
    await soloFavoritos(page).check();
    await expect(tarjetas(page)).toHaveCount(1);

    await tarjetaDe(page, recurso.titulo).getByRole('button', { name: '★ Guardado' }).click();

    await expect(tarjetas(page)).toHaveCount(0);
    await expect(page.getByText(/No tienes lecturas guardadas/)).toBeVisible();
    expect(await listarBiblioteca(request, usuario.token, { favoritos: 'true' })).toEqual([]);
  });

  test('CP_147 · Si falla la operación se informa y el favorito se conserva', async ({ page, request, usuario }) => {
    const [recurso] = await recursosDe(request, usuario.token, 'Tristeza');
    await marcarFavorito(request, usuario.token, recurso.idRecurso);
    await entrarABiblioteca(page, usuario);
    await soloFavoritos(page).check();
    await expect(tarjetas(page)).toHaveCount(1);
    await cortarConexion(page, 'DELETE', /\/api\/library\/\d+\/favorite$/);

    await tarjetaDe(page, recurso.titulo).getByRole('button', { name: '★ Guardado' }).click();

    await expect(page.getByRole('alert')).toHaveText(MSG_SIN_CONEXION);
    await expect(tarjetas(page)).toHaveCount(1);
    expect(await listarBiblioteca(request, usuario.token, { favoritos: 'true' })).toHaveLength(1);
  });
});
