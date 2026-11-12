import { defineConfig, devices } from '@playwright/test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// e2e/ vive en la raíz del proyecto, junto a backend/ y frontend/.
const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BASE_URL = process.env.BASE_URL || 'http://localhost:5173';

export default defineConfig({
  testDir: './tests',
  // Un solo worker: las pruebas comparten la misma base de datos y el mismo límite de intentos.
  fullyParallel: false,
  workers: 1,
  timeout: 30_000,
  expect: { timeout: 7_000 },
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: BASE_URL,
    locale: 'es-CO',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure'
  },
  // Escritorio: así se muestran los controles "desktop-only" (p. ej. «Crear cuenta»).
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 800 } } }],
  // Si backend y frontend ya están corriendo se reutilizan (ver README: el backend debe tener
  // AUTH_RATE_LIMIT_MAX alto). Si no, Playwright los inicia con los valores que necesitan las pruebas.
  webServer: [
    {
      command: 'npm start',
      cwd: path.join(RAIZ, 'backend'),
      url: 'http://127.0.0.1:3000/api/health',
      reuseExistingServer: true,
      timeout: 60_000,
      env: { AUTH_RATE_LIMIT_MAX: '10000', GEMINI_MODE: 'demo' }
    },
    {
      command: 'npm run dev',
      cwd: path.join(RAIZ, 'frontend'),
      url: BASE_URL,
      reuseExistingServer: true,
      timeout: 60_000
    }
  ]
});
