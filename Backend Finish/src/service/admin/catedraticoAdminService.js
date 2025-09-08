import { Seccion, Curso, Usuario } from '../../models/index.js';
import { sequelize } from '../../config/database.js';

export class CatedraticoAdminService {
  static async asignarCurso(catedraticoId, cursoId, numero) {
    return await sequelize.transaction(async t => {
        
      const curso = await Curso.findByPk(cursoId, { transaction: t });
      if (!curso) throw new Error('Curso no existe');

      const cat = await Usuario.findOne({
        where: { id: catedraticoId, rolId: 2 },
        transaction: t
      });
      if (!cat) throw new Error('Catedrático no válido');

      const existe = await Seccion.findOne({
        where: { cursoId, numero },
        transaction: t
      });
      if (existe) throw new Error('La sección ya existe para este curso');

      return await Seccion.create({ cursoId, numero, catedraticoId }, { transaction: t });
    });
  }
}