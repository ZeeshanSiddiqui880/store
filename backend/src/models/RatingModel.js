const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/sequelize");

const Rating = sequelize.define(
  "Rating",
  {
    id: {
     type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    storeId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    rating: {
      type: DataTypes.TINYINT,
      allowNull: false,
      validate: { min: 1, max: 5 },
    },
  },
  {
    tableName: "ratings",
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ["user_id", "store_id"],
      },
    ],
  },
);

module.exports = Rating;
