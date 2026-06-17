 const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const { User } = require("../../models");

const createUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { name, email, password, role, address } = req.body;
    const user = await User.findOne({where:{email}});
    if(user) {
      return res.status(409).json({
        message:"User already exists"
      })
    }
    const newUser = await User.create({name, email, password, address, role})

    return res.status(201).json({
      message:"User created successfully",
      user:{
        id:newUser.id,
        name,email,address, role
      }
    })

  } catch (err) {
    console.error("CREATE USER ERROR:", err);
    return res.status(500).json({ message: "Server error." });
  }
};

module.exports = { createUser };
