const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      product_id: {
        type: DataTypes.INTEGER,
        // is this reference correct?
        references: {
          model: 'product',
          key: 'id',
          // or is it key: 'product_id'
        }
      },
      tag_id: {
        type: DataTypes.INTEGER,
        // is this reference correct?
        references: {
          model: 'tag',
          key: 'id',
          // or is it key: 'tag_id'
        }
      },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;