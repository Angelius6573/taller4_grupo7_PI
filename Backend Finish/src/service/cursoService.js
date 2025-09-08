import { Curso } from '../models/curso.js';
import { Seccion } from '../models/seccion.js';
import { Usuario } from '../models/usuario.js';

export class CursoService {
  static async listar() {
    return await Curso.findAll({
      include: {
        model: Seccion,
        as: 'secciones',
        include: [{ model: Usuario, as: 'catedratico', attributes: ['id', 'nombre'] }]
      }
    });
  }

  static async crear(dto) {
    return await Curso.create(dto, { include: [{ association: Curso.hasMany(Seccion, { as: 'secciones' }) }] });
  }
}