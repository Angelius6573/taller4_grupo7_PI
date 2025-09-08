import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Rol = sequelize.define('Rol', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.ENUM('estudiante', 'catedratico', 'admin'), unique: true }
}, {tableName: 'roles', timestamps: false});