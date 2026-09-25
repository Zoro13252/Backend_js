import bcrypt from 'bcryptjs';
import { UniqueConstraintError } from 'sequelize';
import { User } from '../models/User.js';

const SALT_ROUNDS = 10;

function toPublic(user) {
  const json = user.toJSON();
  delete json.password;
  return json;
}

class UserService {
  static async create({ name, email, password }) {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    try {
      const user = await User.create({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: hashedPassword,
      });
      return toPublic(user);
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        const duplicate = new Error('Email already exists');
        duplicate.status = 409;
        throw duplicate;
      }
      throw error;
    }
  }

  static async findAll() {
    const users = await User.findAll();
    return users.map(toPublic);
  }

  static async findById(id) {
    const user = await User.findByPk(id);
    if (!user) return null;
    return toPublic(user);
  }

  static async update(id, data) {
    const user = await User.unscoped().findByPk(id);
    if (!user) return null;

    if (data.name !== undefined) user.name = data.name.trim();
    if (data.email !== undefined) user.email = data.email.trim().toLowerCase();
    if (data.password !== undefined) {
      user.password = await bcrypt.hash(data.password, SALT_ROUNDS);
    }

    try {
      await user.save();
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        const duplicate = new Error('Email already exists');
        duplicate.status = 409;
        throw duplicate;
      }
      throw error;
    }

    return toPublic(user);
  }

  static async delete(id) {
    const deleted = await User.destroy({ where: { id } });
    return deleted > 0;
  }
}

export { UserService };
