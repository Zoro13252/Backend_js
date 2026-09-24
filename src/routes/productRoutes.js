import { Router } from 'express';
import { ProductService } from '../services/ProductService.js';

const router = Router();

// GET /api/products — получить все товары
router.get('/', (_, res) => {
  res.json(ProductService.findAll());
});

// GET /api/products/:id — получить товар по ID
router.get('/:id', (req, res) => {
  const product = ProductService.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

// POST /api/products — создать товар
router.post('/', (req, res) => {
  const { name, description, price, quantity } = req.body;
  if (!name || price === undefined) {
    return res.status(400).json({ message: 'Name and price are required' });
  }
  const product = ProductService.create({ name, description, price, quantity });
  res.status(201).json(product.toJSON());
});

// PUT /api/products/:id — обновить товар
router.put('/:id', (req, res) => {
  const product = ProductService.update(req.params.id, req.body);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

// DELETE /api/products/:id — удалить товар
router.delete('/:id', (req, res) => {
  const deleted = ProductService.delete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Product not found' });
  res.status(204).send();
});

export default router;
