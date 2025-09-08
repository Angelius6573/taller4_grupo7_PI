import Router from 'express';
import {UsuarioService} from '../services/usuarioService.js';
import {wrap} from '../utils/asyncWrapper.js';
import {FiltroService} from '../services/filtroService.js';

export const router = Router();

router.post('/registro', wrap(async (req, res) => res.json(await UsuarioService.registrar(req.body))));

router.post('/login', wrap(async (req, res) => res.json(await UsuarioService.autenticar(req.body.correo, req.body.password))));

router.post('/restablecer', wrap(async (req,res) => {
  const {registro, correo, nuevaPass} = req.body;
  res.json(await UsuarioService.restablecer(registro,correo,nuevaPass));
}));

router.get('/', wrap(async (req, res) => {
  res.json(await FiltroService.usuarios(req.query));
}));