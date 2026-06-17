const { where, Op, or } = require("sequelize");
const { sequelize } = require("../../config/sequelize");
const { User, Store, Rating } = require("../../models");

const getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.count({
      where: { role: { [Op.in]: ["user", "store_owner"] } },
    });
    const totalStores = await Store.count();
    const totalRatings = await Rating.count();
    return res.status(200).json({ totalStores, totalUsers, totalRatings });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error." });
  }
};

const getUsers = async (req, res) => {
  try {
    const {
      name,
      email,
      address,
      role,
      sortBy = "name",
      order = "ASC",
    } = req.query;

    const where = {};
    if (name) where.name = { [Op.like]: `%${name}%` };
    if (email) where.email = { [Op.like]: `%${email}%` };
    if (address) where.address = { [Op.like]: `%${address}%` };
    if (role) where.role = role;

    const validSortFields = ["name", "email", "address", "role", "createdAt"];
    const sortField = validSortFields.includes(sortBy) ? sortBy : "name";
    const sortOrder = order.toUpperCase() === "DESC" ? "DESC" : "ASC";

    const users = await User.findAll({
      where,
      attributes: ["id", "name", "email", "address", "role", "createdAt"],
      order: [[sortField, sortOrder]],
    });
    return res.status(200).json(users);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error." });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: ["id", "name", "email", "address", "role"],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    let stores = [];
    if (user.role === "store_owner") {
      stores = await Store.findAll({
        where: { ownerId: id },
        attributes: [
          "id",
          "name",
          [
            sequelize.fn(
              "ROUND",
              sequelize.fn("AVG", sequelize.col("ratings.rating")),
              1,
            ),
            "averageRating",
          ],
          [sequelize.fn("COUNT", sequelize.col("ratings.id")), "totalRatings"],
        ],
        include: [
          {
            model: Rating,
            as: "ratings",
            attributes: [],
          },
        ],
        group: ["Store.id"],
      });
    }

    return res.status(200).json({ ...user.toJSON(), stores });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error." });
  }
};

module.exports = { getAdminDashboard, getUsers, getUserById };
