import Router from 'express';
import {PerfilService} from '../services/perfilService.js';
import {wrap} from '../utils/asyncWrapper.js';

export const router = Router();

router.get('/estudiante/:id', wrap(async (req, res) => {
    res.json(await PerfilService.verPerfilEstudiante(req.params.id));
}));