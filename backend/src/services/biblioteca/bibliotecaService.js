import { AppError } from '../../utils/AppError.js';
export function createLibraryService(repository) {
  return { categories: () => repository.categories(), list: (user, filters) => repository.list(user, filters),
    async favorite(user, id, add) { if (!await repository.favorite(user, id, add)) throw new AppError(404, 'Recurso no disponible.'); }
  };
}
