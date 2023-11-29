const express = require("express");
const router = express.Router();
const postController = require("../controller/postController");
const { validateToken } = require("../middleware/authMiddleware");

router.get("/", postController.getAllPost);

router.get("/:id", postController.getPostById);

router.patch("/title/:id", validateToken, postController.editPostTitle);

router.patch("/body/:id", validateToken, postController.editPostBody);

router.get("/user/:id", postController.postByUserId);

router.post("/", validateToken, postController.createPost);

router.delete("/:id", validateToken, postController.deletePost);

module.exports = router;
