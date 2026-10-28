import { Router } from 'express';
import { createAuthenticate } from '../../middleware/authenticate.js';
import { createHelpController } from '../../controllers/ayuda-interactiva/ayudainteractivaController.js';
export function createHelpRouter(auth, service) { const r=Router(), c=createHelpController(service); r.use(createAuthenticate(auth)); r.get('/', (req,res,next)=>c.list(req,res).catch(next)); return r; }
