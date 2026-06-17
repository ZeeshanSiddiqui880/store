const express = require("express");
const { authenticate, authorize } = require("../middleware/auth");
const { getAdminDashboard, getUserById, getUsers } = require("../controllers/admin/adminController");
 const { createUser } = require("../controllers/admin/adminUserCreate");
 const { getAllStores } = require("../controllers/stores/getStore");
const { createStore } = require("../controllers/stores/createStore");
const { createUserValidation, createStoreValidation } = require("../middleware/validators");
const router = express.Router();

router.use(authenticate, authorize("admin"));
router.get("/dashboard", getAdminDashboard);

router.get("/users", getUsers);
router.get("/user/:id", getUserById)
router.post("/create-user",createUserValidation, createUser)

router.get("/stores", getAllStores)
router.post("/create-store",createStoreValidation, createStore)

module.exports = router;
