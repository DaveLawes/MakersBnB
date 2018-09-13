'use strict';
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('users', {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING
  }, {});
  return User;
};
