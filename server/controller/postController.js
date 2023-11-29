const { Posts, Likes, Users } = require("../models");

const getAllPost = async (req, res) => {
  try {
    const posts = await Posts.findAll({
      include: [
        {
          model: Likes,
        },
        {
          model: Users,
          attributes: ["fullName", "username", "id"],
        },
      ],
    });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getPostById = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Posts.findByPk(id, {
      include: [
        {
          model: Users,
        },
        { model: Likes },
      ],
    });
    res.json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createPost = async (req, res) => {
  try {
    const post = req.body;
    post.UserId = req.user.id;
    const savedPost = await Posts.create(post);
    res.json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const deletedPost = await Posts.destroy({ where: { id: postId } });
    return res.status(200).json(deletePost);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const postByUserId = async (req, res) => {
  try {
    const id = req.params.id;
    const posts = await Posts.findAll({
      include: [{ model: Likes }],
      where: { UserId: id },
    });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};
const editPostTitle = async (req, res) => {
  try {
    const postId = req.params.id;
    const { title } = req.body;
    const updatedPost = await Posts.update(
      { title: title },
      { where: { id: postId } }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(200).json(error);
  }
};

const editPostBody = async (req, res) => {
  try {
    const postId = req.params.id;
    const { postText } = req.body;
    const updatedPost = await Posts.update(
      { postText: postText },
      { where: { id: postId } }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(200).json(error);
  }
};

module.exports = {
  getAllPost,
  createPost,
  getPostById,
  deletePost,
  postByUserId,
  editPostTitle,
  editPostBody,
};
