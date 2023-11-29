import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Posts from "./pages/Posts";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import { AuthContext } from "./helpers/AuthContext";
import { useEffect, useState } from "react";
import { getCookie } from "./utils/cookie";
import axios from "axios";
import PageNotFound from "./pages/PageNotFound";
import Navbar from "./components/navbar";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });
  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: getCookie("access-token"),
        },
      })
      .then((response) => {
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
      })
      .catch((error) => {
        setAuthState({ ...authState, status: false });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" exact Component={Home} />
            <Route path="/createpost" exact Component={CreatePost} />
            <Route path="/post/:id" exact Component={Posts} />
            <Route path="/register" exact Component={Registration} />
            <Route path="/Login" exact Component={Login} />
            <Route path="/Profile/:id" exact Component={Profile} />
            <Route path="/change-password" exact Component={ChangePassword} />
            <Route path="*" exact Component={PageNotFound} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
