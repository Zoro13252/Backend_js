import { Product } from '../models/Product.js';

const products = [];
let nextId = 1;

class ProductService {
  static create({ name, description, price, quantity }) {
    const product = new Product({
      id: nextId++,
      name,
      description,
      price: Number(price),
      quantity: Number(quantity),
    });
    products.push(product);
    return product;
  }

  static findAll() {
    return products.map((p) => p.toJSON());
  }

  static findById(id) {
    const product = products.find((p) => p.id === Number(id));
    if (!product) return null;
    return product.toJSON();
  }

  static update(id, data) {
    const index = products.findIndex((p) => p.id === Number(id));
    if (index === -1) return null;

    const product = products[index];
    if (data.name !== undefined) product.name = data.name;
    if (data.description !== undefined) product.description = data.description;
    if (data.price !== undefined) product.price = Number(data.price);
    if (data.quantity !== undefined) product.quantity = Number(data.quantity);

    return product.toJSON();
  }

  static delete(id) {
    const index = products.findIndex((p) => p.id === Number(id));
    if (index === -1) return false;
    products.splice(index, 1);
    return true;
  }
}

export { ProductService };
