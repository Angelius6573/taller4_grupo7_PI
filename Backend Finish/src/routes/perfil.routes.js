import Router from 'express';
import {PerfilService} from '../services/perfilService.js';
import {wrap} from '../utils/asyncWrapper.js';

export const router = Router();

router.get('/estudiante/:id', wrap(async (req, res) => {
    res.json(await PerfilService.verPerfilEstudiante(req.params.id));
}));

router.get('/registro/:registro', wrap(async (req,res) => {
  const usr = await PerfilService.porRegistro(req.params.registro);
  if(!usr) return res.status(404).json({error:'No encontrado'});
  res.json(usr);
}));

router.put('/mi', auth(), wrap(async (req,res) => {
  res.json(await PerfilService.actualizarMi(req.usuario.id, req.body));
}));