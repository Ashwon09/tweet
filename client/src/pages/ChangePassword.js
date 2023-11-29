import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { changePasswordService } from "../services/AuthService";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();
  const changePasswordFunction = async () => {
    if (oldPassword !== "" && newPassword1 !== "" && newPassword2 !== "") {
      if (newPassword1 !== newPassword2) {
        alert("New Password does not match re type new password");
        return;
      }
      const body = { oldPassword: oldPassword, newPassword: newPassword1 };
      const res = await changePasswordService(body);
      if (res.status === 200) {
        alert("password changed successful");
        navigate(`/profile/${authState.id}`);
      }
    } else {
      alert("fields are empty");
    }
  };
  return (
    <div className="changePassword">
      <h1>Change your password</h1>
      <div className="formInput">
        <label>Old Password</label>
        <input
          onChange={(event) => {
            setOldPassword(event.target.value);
          }}
          className="inputfield"
          type="password"
          placeholder="Old password"
        />
      </div>
      <div className="formInput">
        <label>New Password</label>
        <input
          onChange={(event) => {
            setNewPassword1(event.target.value);
          }}
          type="password"
          className="inputfield"
          placeholder="New password"
        />
      </div>
      <div className="formInput">
        <label>Re Type New Password</label>
        <input
          onChange={(event) => {
            setNewPassword2(event.target.value);
          }}
          type="password"
          placeholder="New Password"
          className="inputfield"
        />
      </div>
      <button onClick={changePasswordFunction}>Submit</button>
    </div>
  );
}

export default ChangePassword;
