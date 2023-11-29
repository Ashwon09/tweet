import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import {
  deletePostService,
  editBodyService,
  editTitleService,
  getPostById,
} from "../services/PostService";
import {
  addCommentService,
  deleteCommentService,
  getCommentsForPost,
} from "../services/CommentService";

function Posts() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [postInfo, setPostInfo] = useState({});
  const [commentInfo, setCommentInfo] = useState([]);
  const [newComment, setNewComent] = useState("");
  const { authState } = useContext(AuthContext);

  const deletePost = async (postId) => {
    const response = await deletePostService(postId);
    if (response.status === 200) {
      alert("post deleted");
      navigate("/");
    }
  };
  const deleteComment = async (commentId) => {
    const res = await deleteCommentService(commentId);
    if (res.status === 200) {
      alert("coment Deleted ");
      setCommentInfo(
        commentInfo.filter((value) => {
          return value.id !== commentId;
        })
      );
    }
  };

  async function loadPostInfo() {
    const res = await getPostById(id);
    if (res.status === 200) {
      setPostInfo(res.data);
    }
  }

  async function loadPostComments() {
    const response = await getCommentsForPost(id);
    if (response.status === 200) {
      setCommentInfo(response.data);
    }
  }

  useEffect(() => {
    loadPostInfo();
    loadPostComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addComment = async () => {
    if (newComment === "") {
      alert("Comment is empty");
      return;
    }
    const body = {
      commentBody: newComment,
      PostId: id,
    };
    const response = await addCommentService(body);
    if (response.status === 201) {
      const commentToAdd = response.data;
      commentToAdd.User = authState;
      setCommentInfo([...commentInfo, commentToAdd]);
      setNewComent("");
    }
  };

  const ediPost = async (option) => {
    if (option === "title") {
      const newTitle = prompt("Enter new Title:");
      const body = { title: newTitle };
      const res = await editTitleService(id, body);
      if (res.status === 200) {
        setPostInfo({ ...postInfo, title: newTitle });
      }
    } else {
      const newPostText = prompt("Enter new Text");
      const body = {
        commentBody: newComment,
        PostId: id,
      };
      const res = await editBodyService(id, body);
      if (res.status === 200) {
        setPostInfo({ ...postInfo, postText: newPostText });
      }
    }
  };

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div
            className="title"
            onClick={() => {
              if (authState.id === postInfo?.User.id) {
                ediPost("title");
              }
            }}
          >
            {postInfo.title}
          </div>
          <div
            className="body"
            onClick={() => {
              if (authState.id === postInfo?.User.id) {
                ediPost("body");
              }
            }}
          >
            {postInfo.postText}
          </div>
          <div className="footer">
            {postInfo?.User?.username}
            {postInfo?.User?.id === authState.id && (
              <button
                onClick={() => {
                  deletePost(postInfo.id);
                }}
              >
                Delete Post
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            value={newComment}
            placeholder="Comment ..."
            onChange={(event) => {
              setNewComent(event.target.value);
            }}
          />
          <button onClick={addComment}>Add Comment</button>
        </div>
        <div className="listOfComments">
          {commentInfo.map((cmt, key) => {
            return (
              <div key={key} className="comment">
                {cmt.commentBody}
                <label>Username : {cmt?.User.username}</label>
                {authState.id === cmt?.User.id && (
                  <button
                    onClick={() => {
                      deleteComment(cmt.id);
                    }}
                  >
                    X
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Posts;
