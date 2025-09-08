import {DataTypes} from 'sequelize';
import {sequelize} from '../config/database.js';
import {Curso} from './curso.js';
import {Usuario} from './usuario.js';

export const Seccion = sequelize.define('Seccion', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  cursoId: { type: DataTypes.INTEGER, allowNull: false },
  numero: { type: DataTypes.INTEGER, allowNull: false },
  laboratorio: { type: DataTypes.BOOLEAN, defaultValue: false },
  catedraticoId: { type: DataTypes.INTEGER }
}, { tableName: 'secciones', timestamps: false });

Seccion.uniqueKeys = { curso_seccion_unique: { fields: ['cursoId', 'numero'] } };

Seccion.belongsTo(Curso, { foreignKey: 'cursoId' });
Seccion.belongsTo(Usuario, { foreignKey: 'catedraticoId', as: 'catedratico' });