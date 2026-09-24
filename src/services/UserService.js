import { User } from '../models/User.js';

const users = [];
let nextId = 1;

class UserService {
  static create({ name, email, password }) {
    const user = new User({
      id: nextId++,
      name,
      email,
      password,
    });
    users.push(user);
    return user;
  }

  static findAll() {
    return users.map((u) => u.toJSON());
  }

  static findById(id) {
    const user = users.find((u) => u.id === Number(id));
    if (!user) return null;
    return user.toJSON();
  }

  static update(id, data) {
    const index = users.findIndex((u) => u.id === Number(id));
    if (index === -1) return null;

    const user = users[index];
    if (data.name !== undefined) user.name = data.name;
    if (data.email !== undefined) user.email = data.email;
    if (data.password !== undefined) user.password = data.password;

    return user.toJSON();
  }

  static delete(id) {
    const index = users.findIndex((u) => u.id === Number(id));
    if (index === -1) return false;
    users.splice(index, 1);
    return true;
  }
}

export { UserService };
