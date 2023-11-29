const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const { validateToken } = require("../middleware/authMiddleware");

router.post("/register", userController.register);

router.post("/login", userController.login);

router.get("/auth", validateToken, userController.auth);

router.get("/:id", userController.getUserById);

router.patch("/change-password", validateToken, userController.changePassword);

module.exports = router;
