import { Router, Request, Response } from 'express';
import usersController from '../controller/usersController.js';

const router = Router();


router.get('/', usersController.getAll);
router.get('/:id', usersController.getById);
router.get('/me', usersController.getUser);
// router.post('/', usersController.create);

router.patch('/:id', usersController.update);

router.delete('/:id', usersController.delete);

export default router;


