import { request } from '../authApi.js';
export const getHelp = token => request('/help',{token});
