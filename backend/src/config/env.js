import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';

const ENV_FILE = fileURLToPath(new URL('../../.env', import.meta.url));

const toBool = (value, fallback) => {
  if (value === undefined || value === '') return fallback;
  return ['true', '1', 'yes'].includes(String(value).toLowerCase());
};

const toInt = (value, fallback) => {
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) ? n : fallback;
};

/**
 * Lee backend/.env (si existe) y valida las variables obligatorias.
 * Lanza un Error con un mensaje claro (nunca con valores secretos).
 */
export function loadConfig() {
  dotenv.config({ path: ENV_FILE });
  const env = process.env;

  const windowsAuth = toBool(env.DB_WINDOWS_AUTH, false);
  const required = ['DB_SERVER', 'DB_NAME', 'JWT_SECRET'];
  if (!windowsAuth) required.push('DB_USER', 'DB_PASSWORD');
  const missing = required.filter(
    (key) => !env[key]
  );
  if (missing.length > 0) {
    throw new Error(
      `Faltan variables de entorno: ${missing.join(', ')}. ` +
        'Copia backend/.env.example a backend/.env y complétalo (ver README).'
    );
  }
  if (env.JWT_SECRET.length < 32) {
    throw new Error('JWT_SECRET debe tener al menos 32 caracteres (ver .env.example).');
  }

  const bcryptCost = Math.min(12, Math.max(10, toInt(env.BCRYPT_COST, 12)));

  return {
    nodeEnv: env.NODE_ENV || 'development',
    isProduction: env.NODE_ENV === 'production',
    port: toInt(env.PORT, 3000),
    corsOrigin: env.CORS_ORIGIN || 'http://localhost:5173',
    db: {
      windowsAuth,
      odbcDriver: env.DB_ODBC_DRIVER || 'ODBC Driver 18 for SQL Server',
      server: env.DB_SERVER,
      port: toInt(env.DB_PORT, 1433),
      instance: env.DB_INSTANCE || undefined,
      database: env.DB_NAME,
      user: env.DB_USER,
      password: env.DB_PASSWORD,
      encrypt: toBool(env.DB_ENCRYPT, true),
      trustServerCertificate: toBool(env.DB_TRUST_SERVER_CERT, true)
    },
    jwt: {
      secret: env.JWT_SECRET,
      expiresIn: env.JWT_EXPIRES_IN || '2h'
    },
    bcryptCost,
    authRateLimitMax: toInt(env.AUTH_RATE_LIMIT_MAX, 20)
    ,gemini: { mode: env.GEMINI_MODE === 'live' ? 'live' : 'demo', apiKey: env.GEMINI_API_KEY || '', model: env.GEMINI_MODEL || 'gemini-3.8-flash' }
  };
}
