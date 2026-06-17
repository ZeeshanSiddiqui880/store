const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { User } = require("../../models");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { name, email, password, address } = req.body;

    const user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(409).json({
        message: "User already exists",
      });
    }
    const role = "user";
    const result = await User.create({ name, email, password, address, role });

    const userId = result.id;

    const token = jwt.sign({ id: userId, role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY || "1d",
    });
    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: userId,
        name,
        email,
        address,
        role,
      },
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return res.status(500).json({ message: "Server error." });
  }
};

const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    const result = await User.findOne({ where: { email } });
    if (!result) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }
    const comparePass = await result.comparePassword(password);
    if (!comparePass) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: result.id,
        role: result.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRY || "1d",
      },
    );

    return res.status(200).json({
      message: "Logged in successfully!",
      token,
      user: {
        id: result.id,
        name: result.name,
        email: result.email,
        address: result.address,
        role: result.role,
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ message: "Server error." });

  }
};

const changePassword = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    const { currentPassword, newPassword } = req.body;

    const userId = req.user.id;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Current password is incorrect",
      });
    }

    user.password = newPassword;

    await user.save();

    return res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (err) {
    console.error("CHANGE PASSWORD ERROR:", err);

    return res.status(500).json({
      message: "Server error.",
    });
  }
};

module.exports = { register, login, changePassword };
