import { Usuario } from '../models/usuario.js';
import { Curso } from '../models/curso.js';
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
    static async porRegistro(registro){
        return await Usuario.findOne({
            where:{registro},
            attributes:['id','registro','nombre','apellido','correo'],
            include:[{association:'rol', attributes:['nombre']}]
        });
    }

    static async actualizarMi(id, datos){
        const {nombre, apellido, correo} = datos;
        await Usuario.update({nombre, apellido, correo},{where:{id}});
        return await Usuario.findByPk(id);
    }
}