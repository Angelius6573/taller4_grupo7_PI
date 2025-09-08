import Router from 'express';
import {CursoAprobadoService } from '../services/cursoAprobadoService.js';
import {auth} from '../middleware/auth.js';
import {wrap} from '../utils/asyncWrapper.js';
export const router = Router();

router.get('/usuario/:id', wrap(async (req,res) => {
  res.json(await CursoAprobadoService.listar(req.params.id));
}));

router.get('/mi', auth(), wrap(async (req,res) => {
  res.json(await CursoAprobadoService.listar(req.usuario.id));
}));

router.post('/', auth(), wrap(async (req,res) => {
  const {cursoId} = req.body;
  res.json(await CursoAprobadoService.agregar(req.usuario.id, cursoId));
}));