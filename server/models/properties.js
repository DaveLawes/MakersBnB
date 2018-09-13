'use strict';
module.exports = (sequelize, DataTypes) => {
  const properties = sequelize.define('properties', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {});
  properties.associate = function(models) {
    // associations can be defined here
    properties.belongsTo(models.users, { foreignKey:'user_id', foreignKeyConstraint:true} );
  };
  return properties;
};
