import { Router } from 'express';
import { OrderService } from '../services/OrderService.js';

const router = Router();

// GET /api/orders — получить все заказы
router.get('/', (_, res) => {
  res.json(OrderService.findAll());
});

// GET /api/orders/:id — получить заказ по ID
router.get('/:id', (req, res) => {
  const order = OrderService.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
});

// POST /api/orders — создать заказ
router.post('/', (req, res) => {
  const { userId, products, status, total } = req.body;
  if (!userId || !products) {
    return res.status(400).json({ message: 'userId and products are required' });
  }
  const order = OrderService.create({ userId, products, status, total });
  res.status(201).json(order.toJSON());
});

// PUT /api/orders/:id — обновить заказ
router.put('/:id', (req, res) => {
  const order = OrderService.update(req.params.id, req.body);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
});

// DELETE /api/orders/:id — удалить заказ
router.delete('/:id', (req, res) => {
  const deleted = OrderService.delete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Order not found' });
  res.status(204).send();
});

export default router;
