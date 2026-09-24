class Order {
  constructor({ id, userId, products, status, total }) {
    this.id = id;
    this.userId = userId;
    this.products = products;
    this.status = status;
    this.total = total;
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      products: this.products,
      status: this.status,
      total: this.total,
    };
  }
}

export { Order };
