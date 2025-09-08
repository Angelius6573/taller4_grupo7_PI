import {UsuarioService} from '../services/usuarioService.js';

export function auth(rolPermitido) {
  return async (req, res, next) => {
    const id = req.headers['usuario-id'];
    if (!id) return res.status(401).json({ error: 'Falta usuario-id header' });
    const user = await UsuarioService.porId(id);
    if (!user) return res.status(404).json({ error: 'Usuario no existe' });
    if (rolPermitido && user.rol !== rolPermitido) return res.status(403).json({ error: 'Sin permisos' });
    req.usuario = user;
    next();
  };
}