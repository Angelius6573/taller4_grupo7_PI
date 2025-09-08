export const UsuarioCurso = sequelize.define('UsuarioCurso', {
    usuarioId: { type: DataTypes.BIGINT, primaryKey: true },
    cursoId: { type: DataTypes.BIGINT, primaryKey: true },
    status: { type: DataTypes.ENUM('activo', 'finalizado', 'reprobado'), defaultValue: 'activo' }
}, { tableName: 'usuario_curso', timestamps: false });