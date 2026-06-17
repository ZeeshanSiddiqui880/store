const { Op } = require("sequelize");
const { Store, Rating, User } = require("../../models");
const { sequelize } = require("../../config/sequelize");

const getOwnerDashboard = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const stores = await Store.findAll({
      where: { ownerId },
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
    if (stores.length === 0) {
      return res
        .status(404)
        .json({ message: "No stores associated with your account." });
    }

    const storeIds = stores.map((s) => s.id);
    const allRatings = await Rating.findAll({
      where: { storeId: { [Op.in]: storeIds } },
      attributes: ["storeId", "rating", "createdAt", "updatedAt"],
      include: {
        model: User,
        as: "user",
        attributes: ["id", "name", "email"],
      },
    });
    const ratersMap = {};
    allRatings.forEach((e) => {
      if (!ratersMap[e.storeId]) ratersMap[e.storeId] = [];
      ratersMap[e.storeId].push({
        id: e.user.id,
        name: e.user.name,
        email: e.user.email,
        rating: e.rating,
        updatedAt: e.updatedAt,
      });
    });

    const result = stores.map((store) => ({
      ...store.toJSON(),
      raters: ratersMap[store.id] || [],
    }));

    return res.status(200).json({ stores: result });
  } catch (error) {
    console.error("Error while fetching owner dashboard", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getStoreRatings = async (req, res) => {
  try {
    const ownerId = req.user.id;

    const store = await Store.findOne({
      where: {
        owner_id: ownerId,
      },
    });

    if (!store) {
      return res.status(404).json({
        message: "Store not found",
      });
    }

    const ratings = await Rating.findAll({
      where: {
        StoreId: store.id,
      },
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json(ratings);
  } catch (error) {
    console.error("GET STORE RATINGS ERROR:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

 
module.exports = { getOwnerDashboard, getStoreRatings };
