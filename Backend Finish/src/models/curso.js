import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Curso = sequelize.define('Curso', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  codigo: { type: DataTypes.STRING(20), unique: true, allowNull: false },
  nombre: { type: DataTypes.STRING, allowNull: false },
  creditos: { type: DataTypes.INTEGER }
}, { tableName: 'cursos', timestamps: false });