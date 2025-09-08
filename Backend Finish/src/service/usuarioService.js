import { Usuario } from '../models/usuario.js';
import bcrypt from 'bcryptjs';

export class UsuarioService {
  static async registrar(dto) {
    const existe = await Usuario.findOne({ where: { [Op.or]: [{ carnet: dto.carnet }, { correo: dto.correo }] } });
    if (existe) throw new Error('Carnet o correo ya registrado');
    dto.password = bcrypt.hashSync(dto.password, 10);
    return await Usuario.create(dto);
  }

  static async restablecer(registro, correo, nuevaPass){
    const user = await Usuario.findOne({ where:{ registro, correo } });
    if(!user) throw new Error('Datos no coinciden');
    user.password = bcrypt.hashSync(nuevaPass,10);
    await user.save();
    return { message:'Contraseña actualizada' };
  }

  static async autenticar(correo, password) {
    const user = await Usuario.findOne({ where: { correo } });
    if (!user || !bcrypt.compareSync(password, user.password)) throw new Error('Credenciales inválidas');
    return user;
  }

  static async porId(id) {
    return await Usuario.findByPk(id);
  }

  static async esEstudiante(id) {
    const u = await Usuario.findByPk(id);
    return u && u.rol === 'estudiante';
  }

  static async esCatedratico(id) {
    const u = await Usuario.findByPk(id);
    return u && u.rol === 'catedratico';
  }
}