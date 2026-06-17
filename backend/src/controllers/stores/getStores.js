 const { sequelize } = require("../../config/sequelize");
const { Store, Rating } = require("../../models");

const getStores = async (req, res) => {
  try {
    const { name, email, address } = req.query;
    const userId = req.user.id;

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

    const userRatings = await Rating.findAll({
      where: { userId },
      attributes: ["storeId", "rating"],
    });

    const myRatings = {};
    userRatings.forEach((r) => {
      myRatings[r.storeId] = r.rating;
    });
    const result = stores.map((store) => ({
      ...store.toJSON(),
      myRating: myRatings[store.id] || null,
    }));
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error while fetching stores", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getStores };
