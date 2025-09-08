import { Foro } from '../models/foro.js';
import { UsuarioService } from './usuarioService.js';

export class ForoService {
  static async publicar(dto) {
    if (!(await UsuarioService.esEstudiante(dto.autorId))) throw new Error('Solo estudiantes pueden opinar');
    return await Foro.create(dto);
  }

  static async porCurso(cursoId) {
    return await Foro.findAll({
      where: { cursoId },
      include: [{ association: 'autor', attributes: ['id', 'carnet', 'nombre'] }]
    });
  }

  static async ratingPromedio(cursoId) {
    const [result] = await sequelize.query(
      'SELECT AVG(calificacion) promedio FROM foros WHERE cursoId = ?',
      { replacements: [cursoId], type: sequelize.QueryTypes.SELECT }
    );
    return result.promedio || 0;
  }
}