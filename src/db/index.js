import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false,
});

async function initDb() {
  await import('../models/index.js');
  await sequelize.authenticate();
  await sequelize.sync();
}

export { sequelize, initDb };
