import {sequelize} from './database.js';
import {Rol} from '../models/rol.js';

await sequelize.sync();
await Rol.bulkCreate(
  [{ nombre: 'estudiante' }, { nombre: 'catedratico' }, { nombre: 'admin' }],
  { ignoreDuplicates: true }
);
console.log('✅ Roles creados');
process.exit(0);