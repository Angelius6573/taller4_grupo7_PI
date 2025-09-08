import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { Usuario } from './usuario.js';
import { Curso } from './curso.js';

export const Foro = sequelize.define('Foro', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  autorId: { type: DataTypes.INTEGER, allowNull: false },
  cursoId: { type: DataTypes.INTEGER, allowNull: false },
  calificacion: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } },
  comentario: { type: DataTypes.TEXT }
}, { tableName: 'foros', timestamps: false });

Foro.belongsTo(Usuario, { foreignKey: 'autorId', as: 'autor' });
Foro.belongsTo(Curso, { foreignKey: 'cursoId' });