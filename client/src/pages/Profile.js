import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostsComponent from "../components/PostsComponent";
import { AuthContext } from "../helpers/AuthContext";
import { loadUserInfo } from "../services/ProfileService";
import { getPostbyUser } from "../services/PostService";

function Profile() {
  const { id } = useParams();
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  async function loadProfile() {
    const res = await loadUserInfo(id);
    if (res.status === 200) {
      setUserInfo(res.data);
    }
  }
  async function loadPostOfUser() {
    const res = await getPostbyUser(id);
    if (res.status === 200) {
      setUserPosts(res.data);
    }
  }

  useEffect(() => {
    loadProfile();
    loadPostOfUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="profilePageContainer">
      <div className="basicInfo">
        <h1>Username : {userInfo?.username}</h1>
        <h1>Fullname : {userInfo?.fullName}</h1>
        {userInfo.id === authState.id && (
          <button
            onClick={() => {
              navigate("/change-password");
            }}
          >
            Change Password
          </button>
        )}
      </div>
      <div className="listOfPosts">
        <div>
          {userPosts.map((post, key) => {
            return <PostsComponent post={post} key={key} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Profile;
