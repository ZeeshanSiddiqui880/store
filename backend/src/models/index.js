const Rating = require("./RatingModel");
const Store = require("./StoreModel");
const User = require("./UserModel");

User.hasMany(Rating, { foreignKey: "userId", as: "ratings" });
Rating.belongsTo(User, { foreignKey: "userId", as: "user" });

Store.hasMany(Rating, { foreignKey: "storeId", as: "ratings" });
Rating.belongsTo(Store, { foreignKey: "storeId", as: "store" });

User.hasMany(Store, { foreignKey: "ownerId", as: "stores" });
Store.belongsTo(User, { foreignKey: "ownerId", as: "owner" });

module.exports = { User, Store, Rating };
