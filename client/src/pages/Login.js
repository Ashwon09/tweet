import React, { useState, useContext, useEffect } from "react";
import { getCookie, setCookie } from "../utils/cookie";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { loginService } from "../services/AuthService";
function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const { setAuthState } = useContext(AuthContext);
  useEffect(() => {
    const user = getCookie("logged-in");
    if (user) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const login = async () => {
    console.log(user);
    const data = user;
    const response = await loginService(data);
    if (response.status === 200) {
      setCookie("access-token", response.data.accessToken);
      setCookie("logged-in", true);
      setAuthState({
        username: response.data.username,
        id: response.data.id,
        status: true,
      });
      navigate("/");
    }
  };
  return (
    <div className="loginContainer">
      <label>username</label>
      <input name="username" type="text" onChange={handleChange} />
      <label>password</label>
      <input name="password" type="password" onChange={handleChange} />
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
