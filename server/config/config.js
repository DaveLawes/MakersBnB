require('dotenv').config();

module.exports = {
  development: {
    url: process.env.ENV_DATABASE
  },
  test: {
    url: process.env.ENV_TEST_DATABASE
  },
  // production: {
  //   username: 'root',
  //   password: null,
  //   database: 'database_production',
  //   host: '127.0.0.1',
  //   dialect: 'mysql'
  // }
}
