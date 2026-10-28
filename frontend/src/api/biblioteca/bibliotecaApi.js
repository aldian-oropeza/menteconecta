import { request } from '../authApi.js';
export const getCategories = token => request('/library/categories',{token});
export const getLibrary = (token, filters) => request(`/library?${new URLSearchParams(filters)}`,{token});
export const setFavorite = (token,id,add) => request(`/library/${id}/favorite`,{token,method:add?'POST':'DELETE'});
