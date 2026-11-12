import { test as base, expect } from '@playwright/test';
import { registrarUsuario } from './helpers/api.js';

/** `usuario`: cuenta nueva y única creada por API para cada prueba (sin consentimientos ni datos). */
export const test = base.extend({
  usuario: async ({ request }, use) => {
    await use(await registrarUsuario(request));
  }
});

export { expect };
