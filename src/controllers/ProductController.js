import { ProductService } from '../services/ProductService.js';
import { validateProduct } from '../utils/validators.js';

class ProductController {
  static async findAll(_, res) {
    try {
      const products = await ProductService.findAll();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message || 'Internal server error' });
    }
  }

  static async findById(req, res) {
    try {
      const product = await ProductService.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: error.message || 'Internal server error' });
    }
  }

  static async create(req, res) {
    try {
      const validation = validateProduct(req.body);
      if (!validation.valid) {
        return res.status(400).json({ message: validation.message });
      }

      const product = await ProductService.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message || 'Internal server error' });
    }
  }

  static async update(req, res) {
    try {
      const validation = validateProduct(req.body, true);
      if (!validation.valid) {
        return res.status(400).json({ message: validation.message });
      }

      const product = await ProductService.update(req.params.id, req.body);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: error.message || 'Internal server error' });
    }
  }

  static async delete(req, res) {
    try {
      const deleted = await ProductService.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message || 'Internal server error' });
    }
  }
}

export { ProductController };
