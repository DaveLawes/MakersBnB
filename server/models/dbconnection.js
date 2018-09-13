require('dotenv').config();

module.exports = (Sequelize) => {
  if (process.env.npm_lifecycle_event === 'test') {
    target_db = process.env.ENV_TEST_DATABASE
  } else {
    target_db = process.env.ENV_DATABASE
  };
  sequelize = new Sequelize(target_db,
  {
    host: 'localhost',
    dialect: 'sqlite3'
  });
  return sequelize;
};
