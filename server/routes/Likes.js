const express = require("express");
const router = express.Router();
const likeController = require("../controller/likesController");
const { validateToken } = require("../middleware/authMiddleware");

router.post("/", validateToken, likeController.likePost);

module.exports = router;
