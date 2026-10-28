import { Router } from 'express';
import { createAuthenticate } from '../../middleware/authenticate.js';
import { createLibraryController } from '../../controllers/biblioteca/bibliotecaController.js';
export function createLibraryRouter(authService, service) {
  const router = Router(), c = createLibraryController(service);
  const wrap = fn => (req,res,next) => Promise.resolve(fn(req,res)).catch(next);
  router.use(createAuthenticate(authService));
  router.get('/categories', wrap(c.categories)); router.get('/', wrap(c.list));
  router.post('/:id/favorite', wrap(c.add)); router.delete('/:id/favorite', wrap(c.remove));
  return router;
}
