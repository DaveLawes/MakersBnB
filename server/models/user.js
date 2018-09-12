'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: DataTypes.STRING
  }, {});
  user.associate = function(models) {
    // associations can be defined
    user.hasMany(models.property);
  };
  return user;
};
