require('dotenv').config();

module.exports = {
  development: {
    username: 'root',
    password: 'Shitisreal',
    database: 'auth_me_db',
    host: '127.0.0.1',
    dialect: 'mysql',
    operatorsAliases: 0,
  },
  test: {
    username: 'root',
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_TEST_DATABASE,
    host: '127.0.0.1',
    dialect: 'mysql',
    operatorsAliases: 0,
  },
  production: {
    username: 'root',
    password: null,
    database: 'auth_me_prod',
    host: '127.0.0.1',
    dialect: 'mysql',
    operatorsAliases: 0,
  },
};
