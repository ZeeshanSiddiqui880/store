const { body } = require("express-validator");

const pass = () => {
  return body("password")
    .isLength({ min: 8, max: 16 })
    .withMessage("Password must be 8-16 chars")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one upper case letter")
    .matches(/[^a-zA-Z0-9]/)
    .withMessage("Password must contain at least one special char");
};

const email = () => {
  return body("email")
    .isEmail()
    .withMessage("Must be a valid email address")
    .normalizeEmail();
};

const name = () => {
  return body("name")
    .isLength({ min: 10, max: 60 })
    .withMessage("Name must be 10 - 60 characters");
};
const address = () => {
  return body("address")
    .isLength({ max: 400 })
    .withMessage("Address must be at most 400 characters");
};
const registerValidation = [name(), email(), pass(), address()];

const loginValidation = [
  email(),
  body("password").notEmpty().withMessage("Password is required"),
];

const createUserValidation = [
  name(),
  email(),
  pass(),
  address(),
  body("role")
    .optional()
    .isIn(["admin", "user", "store_owner"])
    .withMessage("Role must be admin, user, store_owner"),
];

const createStoreValidation = [name("name"), email(), address()];

const ratingValidation = [
  body("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be an integer and between 1 to 5"),
];

const changePassValidation = [
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required"),
  body("newPassword")
    .isLength({ min: 8, max: 16 })
    .withMessage("Password must be 8-16 chars")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one upper case letter")
    .matches(/[^a-zA-Z0-9]/)
    .withMessage("Password must contain at least one special char"),
];


module.exports = {
  registerValidation,
  loginValidation,
  createUserValidation,
  createStoreValidation,
  ratingValidation,
  changePassValidation
};

