const { Op } = require("sequelize");
 const { Store, Rating } = require("../../models");
const { sequelize } = require("../../config/sequelize");

const getAllStores = async (req, res) => {
  try {
    const { name, email, address } = req.query;
    const where = {};
    if (name) where.name = { [Op.like]: `%${name}%` };
    if (email) where.email = { [Op.like]: `%${email}%` };
    if (address) where.address = { [Op.like]: `%${address}%` };
    const stores = await Store.findAll({
      where,
      attributes: [
        "id",
        "name",
        "email",
        "address",
        "ownerId",
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
    return res.status(200).json(stores);
  } catch (error) {
    console.error("Error while fetching all stores", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAllStores };
