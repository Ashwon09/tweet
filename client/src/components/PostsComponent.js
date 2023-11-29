import React, { useContext } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { AuthContext } from "../helpers/AuthContext";
import { useNavigate } from "react-router-dom";
import { ListOfPostContext } from "../helpers/ListOfPostsContext";
import { likePostService } from "../services/PostService";

const PostsComponent = (props) => {
  const { post, key } = props;
  const { authState } = useContext(AuthContext);
  const { listOfPosts, setListOfPosts } = useContext(ListOfPostContext);
  const navigate = useNavigate();
  const likePost = async (postId) => {
    const body = { postID: postId };
    try {
      const res = await likePostService(body);
      if (res.status === 200) {
        setListOfPosts(
          listOfPosts.map((post) => {
            if (post.id === res.data.info.PostId) {
              if (res.data.liked) {
                return {
                  ...post,
                  Likes: [...post.Likes, res.data.info],
                };
              } else {
                const updatedLikes = post.Likes.filter(
                  (like) => like.id !== res.data.info.id
                );
                return {
                  ...post,
                  Likes: updatedLikes,
                };
              }
            } else {
              return post;
            }
          })
        );
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error.response.data.message);
    }
  };
  return (
    <div className="post" key={key}>
      <div className="title">{post.title}</div>
      <div
        className="body"
        onClick={() => {
          navigate(`/post/${post.id}`);
        }}
      >
        {post.postText}
      </div>
      <div className="footer">
        <div
          onClick={() => {
            navigate(`/profile/${post.User.id}`);
          }}
          className="username"
        >
          {post?.User?.username}
        </div>
        <div className="buttons">
          {post.Likes.some((obj) => obj.UserId === authState.id) ? (
            <FavoriteIcon
              onClick={() => {
                likePost(post.id);
              }}
            />
          ) : (
            <FavoriteBorderIcon
              onClick={() => {
                likePost(post.id);
              }}
            />
          )}

          <label>{post.Likes.length}</label>
        </div>
      </div>
    </div>
  );
};

export default PostsComponent;
