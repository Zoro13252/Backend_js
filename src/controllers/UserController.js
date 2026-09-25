import { UserService } from '../services/UserService.js';
import { validateUser } from '../utils/validators.js';

class UserController {
  static async findAll(_, res) {
    try {
      const users = await UserService.findAll();
      res.json(users);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
  }

  static async findById(req, res) {
    try {
      const user = await UserService.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
  }

  static async create(req, res) {
    try {
      const validation = validateUser(req.body);
      if (!validation.valid) {
        return res.status(400).json({ message: validation.message });
      }

      const user = await UserService.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
  }

  static async update(req, res) {
    try {
      const validation = validateUser(req.body, true);
      if (!validation.valid) {
        return res.status(400).json({ message: validation.message });
      }

      const user = await UserService.update(req.params.id, req.body);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
  }

  static async delete(req, res) {
    try {
      const deleted = await UserService.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
  }
}

export { UserController };
