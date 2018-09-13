'use strict';
module.exports = (sequelize, DataTypes) => {
  const property = sequelize.define('property', {
    title: DataTypes.STRING(60),
    userId: DataTypes.INTEGER,
    description: DataTypes.STRING(1000),
    pricePerNight: DataTypes.INTEGER,
    photo: DataTypes.STRING
  }, {});
  property.associate = function(models) {
    property.belongsTo(models.user);
  };
  return property;
};
