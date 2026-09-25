import { OrderService } from '../services/OrderService.js';
import { validateOrder } from '../utils/validators.js';

class OrderController {
  static async findAll(_, res) {
    try {
      const orders = await OrderService.findAll();
      res.json(orders);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
  }

  static async findById(req, res) {
    try {
      const order = await OrderService.findById(req.params.id);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.json(order);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
  }

  static async create(req, res) {
    try {
      const validation = validateOrder(req.body);
      if (!validation.valid) {
        return res.status(400).json({ message: validation.message });
      }

      const order = await OrderService.create(req.body);
      res.status(201).json(order);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
  }

  static async update(req, res) {
    try {
      const validation = validateOrder(req.body, true);
      if (!validation.valid) {
        return res.status(400).json({ message: validation.message });
      }

      const order = await OrderService.update(req.params.id, req.body);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.json(order);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
  }

  static async delete(req, res) {
    try {
      const deleted = await OrderService.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
  }
}

export { OrderController };
