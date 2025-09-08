import { Usuario } from '../models/usuario.js';
import { Curso } from '../models/Curso.js';
import { Publicacion } from '../models/publicacion.js';

export class PerfilService {
    static async verPerfilEstudiante(estudianteId) {
        const estudiante = await Usuario.findByPk(estudianteId, {
        attributes: ['id', 'carnet', 'nombre', 'apellido', 'correo']
        });
        if (!estudiante) throw new Error('Estudiante no encontrado');

        const cursos = await Curso.findAll({
        include: [{
            model: Usuario,
            where: { id: estudianteId },
            through: { attributes: ['status'] }
        }]
        });

        const publicaciones = await Publicacion.findAll({
        where: { autorId: estudianteId },
        attributes: ['id', 'contenido', 'likes', 'fecha']
        });

        return { estudiante, cursos, publicaciones };
    }
}