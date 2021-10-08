require('dotenv').config();

module.exports = {
  development: {
    username: 'bob',
    password: 123,
    database: 'cva',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: process.env.PS_USER,
    password: process.env.PS_PASS,
    database: process.env.PS_DB,
    host: process.env.PS_HOST,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
};
