import Router from 'express';
import {ComentarioService } from '../services/comentarioService.js';
import {auth} from '../middleware/auth.js';
import {wrap} from '../utils/asyncWrapper.js';
export const router = Router();

router.post('/', auth(), wrap(async (req,res) => {
  res.json(await ComentarioService.agregar({...req.body, autorId:req.usuario.id}));
}));

router.get('/publicacion/:id', wrap(async (req,res) => {
  res.json(await ComentarioService.porPublicacion(req.params.id));
}));