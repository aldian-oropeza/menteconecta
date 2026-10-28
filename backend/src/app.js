import express from 'express';
import { createLibraryRouter } from './routes/biblioteca/bibliotecaRoutes.js';
import { createHelpRouter } from './routes/ayuda-interactiva/ayudainteractivaRoutes.js';
import { createChatRouter } from './routes/chat-gemini/chatgeminiRoutes.js';
import cors from 'cors';
import helmet from 'helmet';
import { createAuthRouter } from './routes/authRoutes.js';
import { createConsentRouter } from './routes/consentRoutes.js';
import { createEmotionRouter } from './routes/emotionRoutes.js';
import { createErrorHandler, notFoundHandler } from './middleware/errorHandler.js';

/**
 * Construye la app Express sin abrir puertos ni conexiones (así se puede probar).
 * @param {{ authService: object, consentService: object, emotionService: object, config: object }} deps
 */
export function createApp({ authService, consentService, emotionService, libraryService, helpService, chatService, config }) {
  const app = express();

  app.disable('x-powered-by');
  app.use(helmet());
  app.use(cors({ origin: config.corsOrigin, methods: ['GET', 'POST', 'DELETE'], allowedHeaders: ['Content-Type', 'Authorization'] }));
  app.use(express.json({ limit: '10kb' }));

  app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
  app.use('/api/auth', createAuthRouter({ authService, config }));
  app.use('/api/consent', createConsentRouter({ authService, consentService }));
  app.use('/api/emotions', createEmotionRouter({ authService, emotionService }));
  if (libraryService) app.use('/api/library', createLibraryRouter(authService, libraryService));
  if (helpService) app.use('/api/help', createHelpRouter(authService, helpService));
  if (chatService) app.use('/api/chat', createChatRouter(authService, chatService));

  app.use(notFoundHandler);
  app.use(createErrorHandler(config));
  return app;
}
