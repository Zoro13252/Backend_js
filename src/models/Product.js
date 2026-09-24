class Product {
  constructor({ id, name, description, price, quantity }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      quantity: this.quantity,
    };
  }
}

export { Product };
