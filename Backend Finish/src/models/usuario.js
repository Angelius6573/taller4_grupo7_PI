import {DataTypes} from 'sequelize';
import {sequelize} from '../config/database.js';
import {Rol} from './rol.js';

export const Usuario = sequelize.define('Usuario', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    carnet: { type: DataTypes.STRING(9), unique: true, allowNull: false },
    nombre: { type: DataTypes.STRING, allowNull: false },
    correo: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    rolId: { type: DataTypes.INTEGER, allowNull: false }
}, { tableName: 'usuarios', timestamps: false });

Usuario.belongsTo(Rol, { foreignKey: 'rolId', as: 'rol' });