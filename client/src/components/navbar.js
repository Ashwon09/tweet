import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import Cookies from "js-cookie";

function Navbar() {
  const navigate = useNavigate();
  const { authState, setAuthState } = useContext(AuthContext);
  const logout = () => {
    Cookies.remove("access-token");
    Cookies.remove("logged-in");
    setAuthState({
      username: "",
      id: 0,
      status: false,
    });
    navigate("/");
  };
  return (
    <div className="navbar">
      <Link to="/"> Home Page</Link>
      {authState.status ? (
        <>
          <Link to="/createpost"> Create A Post</Link>

          <div className="loggedInContainer">
            <h1
              onClick={() => {
                navigate(`/profile/${authState.id}`);
              }}
            >
              {authState.username}{" "}
            </h1>
            {authState.status && <button onClick={logout}> Logout</button>}
          </div>
        </>
      ) : (
        <>
          <Link to="/login"> Login</Link>
          <Link to="/register"> Registration</Link>
        </>
      )}
    </div>
  );
}

export default Navbar;
