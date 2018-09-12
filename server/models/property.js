'use strict';
module.exports = (sequelize, DataTypes) => {
  const property = sequelize.define('property', {
    title: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {});
  property.associate = function(models) {
    property.belongsTo(models.user);
  };
  return property;
};
