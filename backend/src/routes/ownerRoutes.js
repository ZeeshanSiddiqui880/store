const express = require("express");
const {
  getOwnerDashboard,
  getStoreRatings,
} = require("../controllers/owner/ownerController");
const { authenticate, authorize } = require("../middleware/auth");
const { createStoreValidation } = require("../middleware/validators");
const { createStore } = require("../controllers/stores/createStore");
const router = express.Router();

router.use(authenticate, authorize("store_owner"));
router.get("/dashboard", getOwnerDashboard);
router.get("/store/ratings", getStoreRatings);
router.post("/create-store", createStoreValidation, createStore);

module.exports = router;
