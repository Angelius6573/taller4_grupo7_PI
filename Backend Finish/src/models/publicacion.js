export const Publicacion = sequelize.define('Publicacion', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    autorId: { type: DataTypes.BIGINT, allowNull: false },
    cursoId: { type: DataTypes.BIGINT, allowNull: false },
    contenido: { type: DataTypes.TEXT },
    likes: { type: DataTypes.BIGINT, defaultValue: 0 },
    fecha: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW }
}, { tableName: 'publicaciones', timestamps: false });