const express = require("express");
const { getStores } = require("../controllers/stores/getStores");
const { authenticate, authorize } = require("../middleware/auth");
 const { submitRatings } = require("../controllers/stores/submitRatings");
const { ratingValidation } = require("../middleware/validators");
const router = express.Router();

router.use(authenticate, authorize("user"));
router.get("/", getStores);
router.post("/:storeId/rating", ratingValidation, submitRatings)

module.exports = router;
