import { Router } from 'express';
import { OrderController } from '../controllers/OrderController.js';

const router = Router();

router.get('/', OrderController.findAll);
router.get('/:id', OrderController.findById);
router.post('/', OrderController.create);
router.put('/:id', OrderController.update);
router.delete('/:id', OrderController.delete);

export default router;
