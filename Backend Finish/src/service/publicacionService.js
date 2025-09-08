import {Publicacion, Curso, Usuario, Sequelize} from '../models/index.js';
const {Op} = Sequelize;

export class PublicacionService {
  static async listar({cursoId, catedraticoId, nombreCurso, nombreCat, order='DESC', offset=0, limit=20}){
    const where = {};
    const include = [
      { model:Usuario, as:'autor', attributes:['id','registro','nombre','apellido'] },
      { model:Curso, as:'curso', where:{} }
    ];

    if(cursoId) where.cursoId = cursoId;
    if(catedraticoId) include[1].where.catedraticoId = catedraticoId;
    if(nombreCurso) include[1].where.nombre = {[Op.like]:`%${nombreCurso}%`};
    if(nombreCat){
      include.push({ model:Usuario, as:'catedratico', where:{ nombre:{[Op.like]:`%${nombreCat}%`} }, attributes:[] });
      include[1].include = [{association:'catedratico', where:{}}];
    }

    return await Publicacion.findAndCountAll({
      where, include, order:[['fecha',order]], offset, limit
    });
  }
}