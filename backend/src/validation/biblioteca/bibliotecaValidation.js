import { AppError } from '../../utils/AppError.js';
export function positiveId(value) {
  if (!/^[1-9]\d*$/.test(String(value)) || !Number.isSafeInteger(Number(value)) || Number(value) > 2147483647) throw new AppError(400, 'Identificador inválido.');
  return Number(value);
}
export function libraryFilters(query) {
  const search = query.q ?? '';
  if (typeof search !== 'string' || search.length > 100) throw new AppError(400, 'La búsqueda admite hasta 100 caracteres.');
  if (query.favoritos !== undefined && !['true', 'false'].includes(query.favoritos)) throw new AppError(400, 'Filtro de favoritos inválido.');
  const emotion = query.emocion || null;
  if (emotion !== null && !['Tristeza','Estrés','Ansiedad','Soledad','Alegría','Frustración'].includes(emotion)) throw new AppError(400, 'Emoción inválida.');
  return { emotion, search: search.trim(), category: query.categoria ? positiveId(query.categoria) : null, favorites: query.favoritos === 'true' };
}
