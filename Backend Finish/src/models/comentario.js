export const Comentario = sequelize.define('Comentario', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    publicacionId: { type: DataTypes.BIGINT, allowNull: false },
    autorId: { type: DataTypes.BIGINT, allowNull: false },
    contenido: { type: DataTypes.TEXT },
    fecha: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW }
}, { tableName: 'comentarios', timestamps: false });