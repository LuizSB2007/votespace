import express from 'express';
import roomController from '../controller/roomController.js';

const router = express.Router();

router.get('/', roomController.getAllRooms);
router.get('/:name', roomController.getRoomByName);
router.post('/', roomController.createRoom);
router.put('/:id', roomController.updateRoom);
router.delete('/:id', roomController.deleteRoom);

export default router;