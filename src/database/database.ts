import {Sequelize} from 'sequelize';

export const sequelize = new Sequelize(
  'postgres',
  'postgres',
  '',
  {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
    },
    logging: false
  }
)

