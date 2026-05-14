import express from 'express';
import roomController from '../controller/roomController.js';
import optionRoutes from './optionRoutes.js'
import voteRoutes from './voteRoutes.js'
import { permissionEditMiddleware } from '../middlewares/permissionMiddleware.js';

const router = express.Router();

router.use('/:id/option', optionRoutes);
router.use('/:id/vote', voteRoutes);

router.get('/', roomController.getAll);
router.get('/:id', roomController.getById);
router.get('/slug/:slug', roomController.getBySlug);

router.post('/', roomController.create);
router.patch('/:id', permissionEditMiddleware, roomController.update);
router.delete('/:id', permissionEditMiddleware, roomController.delete);

export default router;