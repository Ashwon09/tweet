const express = require("express");
const router = express.Router();
const postRouter = require("./Posts");
const commentRouter = require("./Comments");
const authRouter = require("./Users");
const likeRouter = require("./Likes");

router.use("/posts", postRouter);
router.use("/comments", commentRouter);
router.use("/auth", authRouter);
router.use("/likes", likeRouter);

module.exports = router;
