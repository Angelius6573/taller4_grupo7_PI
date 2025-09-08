import {Usuario} from '../models/usuario.js';
import {Rol} from '../models/rol.js';
import {Op} from 'sequelize';

export class FiltroService {
    static async usuarios({ rol, nombre, carnet, offset = 0, limit = 20 }) {
        const where = {};
        if (nombre) where.nombre = { [Op.like]: `%${nombre}%` };
        if (carnet) where.carnet = { [Op.like]: `%${carnet}%` };
        if (rol) where['$rol.nombre$'] = rol;

        return await Usuario.findAndCountAll({
        where,
        include: [{ model: Rol, as: 'rol', attributes: [] }],
        attributes: ['id', 'carnet', 'nombre', 'correo'],
        offset,
        limit,
        raw: true
        });
    }
}