import Router from 'express';
import {CursoService} from '../services/cursoService.js';
import {wrap} from '../utils/asyncWrapper.js';

export const router = Router();

router.get('/', wrap(async (req, res) => res.json(await CursoService.listar())));
router.post('/', wrap(async (req, res) => res.json(await CursoService.crear(req.body))));