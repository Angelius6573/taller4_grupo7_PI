import Router from 'express';
import {AsignacionService} from '../services/AsignacionService.js';
import {auth} from '../middleware/auth.js';
import {wrap} from '../utils/asyncWrapper.js';

export const router = Router();

router.use(auth('catedratico'));

router.get('/', wrap(async (req, res) => {
  res.json(await AsignacionService.estadisticasCatedratico(req.usuario.id));
}));