import { Order } from '../models/Order.js';

const orders = [];
let nextId = 1;

class OrderService {
  static create({ userId, products, status = 'new', total }) {
    const order = new Order({
      id: nextId++,
      userId: Number(userId),
      products,
      status,
      total: Number(total),
    });
    orders.push(order);
    return order;
  }

  static findAll() {
    return orders.map((o) => o.toJSON());
  }

  static findById(id) {
    const order = orders.find((o) => o.id === Number(id));
    if (!order) return null;
    return order.toJSON();
  }

  static update(id, data) {
    const index = orders.findIndex((o) => o.id === Number(id));
    if (index === -1) return null;

    const order = orders[index];
    if (data.userId !== undefined) order.userId = Number(data.userId);
    if (data.products !== undefined) order.products = data.products;
    if (data.status !== undefined) order.status = data.status;
    if (data.total !== undefined) order.total = Number(data.total);

    return order.toJSON();
  }

  static delete(id) {
    const index = orders.findIndex((o) => o.id === Number(id));
    if (index === -1) return false;
    orders.splice(index, 1);
    return true;
  }
}

export { OrderService };
