import {comentario} from '../models/index.js';

export class ComentarioService {
  static async agregar({publicacionId, autorId, contenido}){
    return await comentario.create({publicacionId, autorId, contenido});
  }
  static async porPublicacion(pubId){
    return await comentario.findAll({
      where:{publicacionId:pubId},
      include:[{association:'autor', attributes:['id','nombre','apellido']}]
    });
  }
}