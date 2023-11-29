const express = require("express");
const router = express.Router();
const commentController = require("../controller/commentController");
const { validateToken } = require("../middleware/authMiddleware");

router.get("/", commentController.getAllComment);

router.get("/:Postid", commentController.getCommentByPostId);

router.post("/", validateToken, commentController.createComment);

router.delete("/:commentId", validateToken, commentController.deleteComment);
module.exports = router;
