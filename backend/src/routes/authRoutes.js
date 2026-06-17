const express = require("express");
const router = express.Router();
const { register, login, changePassword } = require("../controllers/authentication/authController");
 const { authenticate, authorize } = require("../middleware/auth");
 const { registerValidation, loginValidation, changePassValidation } = require("../middleware/validators");

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);

router.post("/change-password", authenticate, changePassValidation, changePassword)

module.exports = router;
