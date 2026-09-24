import { Router } from 'express';
import { UserService } from '../services/UserService.js';

const router = Router();

// GET /api/users — получить всех пользователей
router.get('/', (_, res) => {
  res.json(UserService.findAll());
});

// GET /api/users/:id — получить пользователя по ID
router.get('/:id', (req, res) => {
  const user = UserService.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

// POST /api/users — создать пользователя
router.post('/', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }
  const user = UserService.create({ name, email, password });
  res.status(201).json(user.toJSON());
});

// PUT /api/users/:id — обновить пользователя
router.put('/:id', (req, res) => {
  const user = UserService.update(req.params.id, req.body);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

// DELETE /api/users/:id — удалить пользователя
router.delete('/:id', (req, res) => {
  const deleted = UserService.delete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'User not found' });
  res.status(204).send();
});

export default router;
