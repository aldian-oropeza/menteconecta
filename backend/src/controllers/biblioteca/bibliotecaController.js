import { libraryFilters, positiveId } from '../../validation/biblioteca/bibliotecaValidation.js';
export function createLibraryController(service) {
  return {
    categories: async (_req, res) => res.json({ categorias: await service.categories() }),
    list: async (req, res) => res.json({ recursos: await service.list(req.auth.idUsuario, libraryFilters(req.query)) }),
    add: async (req, res) => { await service.favorite(req.auth.idUsuario, positiveId(req.params.id), true); res.status(204).end(); },
    remove: async (req, res) => { await service.favorite(req.auth.idUsuario, positiveId(req.params.id), false); res.status(204).end(); }
  };
}
