const { sequelize } = require("./config/sequelize");
const { User } = require("./models");

require("dotenv").config();
 
const seed = async () => {
  await sequelize.sync();
  const existing = await User.findOne({ where: { email: "admin@storerate.com" } });
  if (!existing) {
    await User.create({
      name: "System Administrator Account",
      email: "admin@storerate.com",
      password: "Admin@123",
      address: "123 Admin Street City State 00000",
      role: "admin",
    });
    console.log("Admin created: admin@storerate.com / Admin@123");
  } else {
    console.log("Admin already exists");
  }
  process.exit(0);
};

seed();