import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {sequelize} from './config/database.js';

import {router as usuarioRouter} from './routes/usuario.routes.js';
import {router as cursoRouter} from './routes/curso.routes.js';
import {router as asignacionRouter} from './routes/asignacion.routes.js';
//import {router as foroRouter} from './routes/foro.routes.js';
import {router as estadisticaRouter} from './routes/estadistica.routes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/usuarios', usuarioRouter);
app.use('/api/cursos', cursoRouter);
app.use('/api/asignaciones', asignacionRouter);
//app.use('/api/foro', foroRouter);
app.use('/api/estadisticas', estadisticaRouter);
app.use('/api/publicaciones', publicacionRouter);
app.use('/api/comentarios', comentarioRouter);
app.use('/api/perfil', perfilRouter);
app.use('/api/cursos-aprobados', cursoAprobadoRouter);
app.use('/api/admin', adminRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 4000;
await sequelize.sync({ alter: true });
app.listen(PORT, () => console.log(`Backend MySQL en puerto ${PORT}`));