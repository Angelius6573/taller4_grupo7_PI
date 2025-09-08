import {CursoService} from '../services/admin/cursoAdminService.js';

router.post('/cursos', auth('admin'), wrap(async (req,res) => res.json(await CursoService.crear(req.body))));
router.put('/cursos/:id', auth('admin'), wrap(async (req,res) => res.json(await CursoService.actualizar(req.params.id, req.body))));
router.delete('/cursos/:id', auth('admin'), wrap(async (req,res) => res.json(await CursoService.borrar(req.params.id))));

router.post('/catedraticos/asignar', auth('admin'), wrap(async (req, res) => {
  const { catedraticoId, cursoId, numero } = req.body;
  const row = await CatedraticoAdminService.asignarCurso(catedraticoId, cursoId, numero);
  res.status(201).json(row);
}));

router.delete('/publicaciones/:id', auth('admin'), wrap(async (req,res) => {
  await Publicacion.destroy({where:{id:req.params.id}});
  res.json({message:'Publicación eliminada'});
}));