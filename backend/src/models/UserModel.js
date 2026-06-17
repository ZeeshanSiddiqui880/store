const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/sequelize");
const bcrypt = require("bcryptjs");


const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(400),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "user", "store_owner"),
      defaultValue: "user",
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: true,
    underscored: true,
    hooks: {
      beforeCreate:async(user)=> {
        if(user.password) {
          user.password = await bcrypt.hash(user.password, 12);
        }
      },
      beforeUpdate:async(user)=> {
        if(user.changed("password")) {
          user.password = await bcrypt.hash(user.password, 12);
        }
      }
    }
  },
);

User.prototype.comparePassword = async function (candidatePassword){
  return bcrypt.compare(candidatePassword, this.password)
}

module.exports = User;
