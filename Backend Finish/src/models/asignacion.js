import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { Usuario } from './usuario.js';
import { Curso } from './curso.js';

export const Asignacion = sequelize.define('Asignacion', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  estudianteId: { type: DataTypes.INTEGER, allowNull: false },
  cursoId: { type: DataTypes.INTEGER, allowNull: false },
  seccion: { type: DataTypes.INTEGER },
  laboratorio: { type: DataTypes.BOOLEAN, defaultValue: false },
  vecesRepitiendo: { type: DataTypes.INTEGER, defaultValue: 0 }
}, { tableName: 'asignaciones', timestamps: false });

Asignacion.belongsTo(Usuario, { foreignKey: 'estudianteId', as: 'estudiante' });
Asignacion.belongsTo(Curso, { foreignKey: 'cursoId' });