import { Asignacion } from '../models/asignacion.js';
import { UsuarioService } from './usuarioService.js';

export class AsignacionService {
  static async asignar({ estudianteId, cursoId, seccion, laboratorio = false }) {
    const yaAsignado = await Asignacion.findOne({ where: { estudianteId, cursoId } });
    if (yaAsignado) throw new Error('Ya estás asignado a este curso');
    const veces = await Asignacion.count({ where: { estudianteId, cursoId } });
    return await Asignacion.create({ estudianteId, cursoId, seccion, laboratorio, vecesRepitiendo: veces });
  }

  static async desasignar(estudianteId, cursoId) {
    const filas = await Asignacion.destroy({ where: { estudianteId, cursoId } });
    if (!filas) throw new Error('No estabas asignado');
    return { message: 'Desasignado' };
  }

  static async porCurso(cursoId) {
    return await Asignacion.findAll({
      where: { cursoId },
      include: [{ association: 'estudiante', attributes: ['id', 'carnet', 'nombre'] }]
    });
  }

  static async estadisticasCatedratico(catedraticoId) {
    const [results] = await sequelize.query(`
      SELECT 
        c.codigo,
        c.nombre,
        COUNT(*) total,
        SUM(a.vecesRepitiendo = 0) primVez,
        SUM(a.vecesRepitiendo > 0) repiten,
        SUBSTRING(u.carnet,1,4) anio,
        COUNT(*) cant
      FROM asignaciones a
      JOIN cursos c ON c.id = a.cursoId
      JOIN secciones s ON s.cursoId = c.id AND s.numero = a.seccion
      JOIN usuarios u ON u.id = a.estudianteId
      WHERE s.catedraticoId = :cat
      GROUP BY c.id, anio
      ORDER BY total DESC, anio DESC
    `, { replacements: { cat: catedraticoId } });
    return results;
  }
}