const { Likes } = require("../models");

const likePost = async (req, res) => {
  try {
    const { postID } = req.body;
    const userID = req.user.id;
    const searchedLike = await Likes.findOne({
      where: { PostId: postID, UserId: userID },
    });
    if (!searchedLike) {
      const like = await Likes.create({
        PostId: postID,
        UserId: userID,
      });
      res.status(200).json({ message: "Liked Post", liked: true, info: like });
    } else {
      const deletedLike = await Likes.destroy({
        where: { PostId: postID, UserId: userID },
      });
      res
        .status(200)
        .json({ message: "Unliked Post", liked: false, info: searchedLike });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { likePost };
