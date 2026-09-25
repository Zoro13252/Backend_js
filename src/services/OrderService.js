import { ForeignKeyConstraintError } from 'sequelize';
import { Order } from '../models/Order.js';
import { User } from '../models/User.js';

class OrderService {
  static async create({ userId, products, status = 'new', total }) {
    const user = await User.findByPk(userId);
    if (!user) {
      const error = new Error('User not found');
      error.status = 400;
      throw error;
    }

    try {
      return await Order.create({
        userId: Number(userId),
        products,
        status,
        total: total === undefined ? 0 : Number(total),
      });
    } catch (error) {
      if (error instanceof ForeignKeyConstraintError) {
        const notFound = new Error('User not found');
        notFound.status = 400;
        throw notFound;
      }
      throw error;
    }
  }

  static async findAll() {
    return Order.findAll();
  }

  static async findById(id) {
    return Order.findByPk(id);
  }

  static async update(id, data) {
    const order = await Order.findByPk(id);
    if (!order) return null;

    if (data.userId !== undefined) {
      const user = await User.findByPk(data.userId);
      if (!user) {
        const error = new Error('User not found');
        error.status = 400;
        throw error;
      }
      order.userId = Number(data.userId);
    }
    if (data.products !== undefined) order.products = data.products;
    if (data.status !== undefined) order.status = data.status;
    if (data.total !== undefined) order.total = Number(data.total);

    await order.save();
    return order;
  }

  static async delete(id) {
    const deleted = await Order.destroy({ where: { id } });
    return deleted > 0;
  }
}

export { OrderService };
