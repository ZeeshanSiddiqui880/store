 const { validationResult } = require("express-validator");
const { Store, User } = require("../../models");

const createStore = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { name, email, ownerId, address } = req.body;

    const existinStore = await Store.findOne({ where: { email } });
    if (existinStore) {
      return res.status(409).json({
        message: "Store already exists",
      });
    }
    if (ownerId) {
      const owner = await User.findByPk(ownerId);
      if (!owner) {
        return res.status(404).json({ message: "Owner not found." });
      }
      if (owner.role !== "store_owner") {
        return res
          .status(400)
          .json({ message: "Assigned user must have store_owner role." });
      }
    }
    const newStore = await Store.create({ name, email, address, ownerId });
    return res.status(201).json({
      message: "Store created successfully!",
      store: {
        id: newStore.id,
        name,
        email,
        address,
        ownerId: ownerId || null,
      },
    });
  } catch (error) {
    console.error("Error while creating new store", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};
module.exports = { createStore };
