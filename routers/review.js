const express = require("express");
const router = express.Router();
const reviewController = require("../controler/reviewControler");
router.get("/newReview/:id", reviewController.createReview);

module.exports = router;
