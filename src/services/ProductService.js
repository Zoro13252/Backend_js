import { Product } from '../models/Product.js';

class ProductService {
  static async create({ name, description, price, quantity }) {
    return Product.create({
      name: name.trim(),
      description: description ?? null,
      price: Number(price),
      quantity: quantity === undefined ? 0 : Number(quantity),
    });
  }

  static async findAll() {
    return Product.findAll();
  }

  static async findById(id) {
    return Product.findByPk(id);
  }

  static async update(id, data) {
    const product = await Product.findByPk(id);
    if (!product) return null;

    if (data.name !== undefined) product.name = data.name.trim();
    if (data.description !== undefined) product.description = data.description;
    if (data.price !== undefined) product.price = Number(data.price);
    if (data.quantity !== undefined) product.quantity = Number(data.quantity);

    await product.save();
    return product;
  }

  static async delete(id) {
    const deleted = await Product.destroy({ where: { id } });
    return deleted > 0;
  }
}

export { ProductService };
