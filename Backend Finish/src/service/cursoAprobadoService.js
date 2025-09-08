import {UsuarioCurso, Curso, Sequelize} from '../models/index.js';

export class CursoAprobadoService {
    static async listar(usuarioId){
        const rows = await UsuarioCurso.findAll({
        where:{usuarioId, status:'finalizado'},
        include:[{model:Curso, attributes:['codigo','nombre','creditos']}]
        });
        const creditos = rows.reduce((s,r) => s + r.Curso.creditos, 0);
        return { cursos:rows, totalCreditos:creditos };
    }

    static async agregar(usuarioId, cursoId){
        const [row] = await UsuarioCurso.upsert({usuarioId, cursoId, status:'finalizado'});
        return row;
    }
}