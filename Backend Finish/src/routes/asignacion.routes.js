import Router from 'express';
import {AsignacionService} from '../services/asignacionService.js';
import {auth} from '../middleware/auth.js';
import {wrap} from '../utils/asyncWrapper.js';

export const router = Router();

router.use(auth('estudiante')); // solo estudiantes

router.post('/', wrap(async (req, res) => {
    const dto = { ...req.body, estudianteId: req.usuario.id };
    res.json(await AsignacionService.asignar(dto));
}));

router.delete('/:cursoId', wrap(async (req, res) => {
    res.json(await AsignacionService.desasignar(req.usuario.id, req.params.cursoId));
}));

router.get('/curso/:cursoId', wrap(async (req, res) => {
    res.json(await AsignacionService.porCurso(req.params.cursoId));
}));