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
    username: 'lmsaznfibxahhk',
    password:
      '131c0c23aa4257849f5d34dcea20ba98a4816f125e1afe33b8d9cae8ac1d7ee1',
    database: 'd297al2rrbuje4',
    host: 'ec2-52-17-1-206.eu-west-1.compute.amazonaws.com',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
};
