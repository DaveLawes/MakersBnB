'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: DataTypes.STRING(60),
    email: DataTypes.STRING(60),
    password: DataTypes.STRING(12)
  }, {
    timestamps: false
  });
  user.associate = function(models) {
    user.hasMany(models.property);
  };
  return user;
};
