import Router from 'express';
import {PublicacionService} from '../services/publicacionService.js';
import {wrap} from '../utils/asyncWrapper.js';
export const router = Router();

router.get('/', wrap(async (req,res) => {
    res.json(await PublicacionService.listar(req.query));
}));