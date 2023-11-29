const { Comments, Users } = require("../models");

const getAllComment = async (req, res) => {
  const comments = await Comments.findAll();
  res.status(200).json(comments);
};

const getCommentByPostId = async (req, res) => {
  try {
    const postId = req.params.Postid;
    const comments = await Comments.findAll({
      where: { PostId: postId },
      include: { model: Users },
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createComment = async (req, res) => {
  try {
    const comment = req.body;
    const id = req.user.id;
    comment.UserId = id;
    const savedComment = await Comments.create(comment);
    res.status(201).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const deletedComment = await Comments.destroy({ where: { id: commentId } });
    res.status(200).json(deletedComment);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAllComment,
  createComment,
  getCommentByPostId,
  deleteComment,
};
