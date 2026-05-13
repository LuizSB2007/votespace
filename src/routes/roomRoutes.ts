import express from 'express';
import roomController from '../controller/roomController.js';

const router = express.Router();

router.get('/', roomController.getAll);
router.get('/:name', roomController.getByName);
router.post('/', roomController.create);
router.patch('/:id', roomController.update);
router.delete('/:id', roomController.delete);

export default router;