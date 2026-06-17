const { validationResult } = require("express-validator");
 const { Store, Rating } = require("../../models");

const submitRatings = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { storeId } = req.params;
    const { rating } = req.body;
    const userId = req.user.id;

    const store = await Store.findByPk(storeId);
    if (!store) {
      return res.status(404).json({ message: "Store not found!" });
    }
    const [ratingRecord, created] = await Rating.upsert(
      { userId, storeId, rating },
      { returning: true },
    );
    return res.status(created ? 201 : 200).json({
      message: created ? "Rating submitted." : "Rating updated.",
    });
  } catch (error) {
    console.error("Failed to submit rating", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { submitRatings };
