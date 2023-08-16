import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Card from "../card/Card";
import { changePassword } from "../../services/authService";
import "./ChangePassword.scss";

const initialState = {
  oldPassword: "",
  password: "",
  password2: "",
};
const ChangePassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);

  const { oldPassword, password, password2 } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const changePass = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      return toast.error("New password does not match");
    }
    const formData = {
      oldPassword,
      password,
    };

    const data = await changePassword(formData);
    toast.success(data);
    navigate("/profile");
  };
  return (
    <div className="change-password">
      <Card cardClass={"password-card"}>
        <h3>Change Password</h3>
        <form onSubmit={changePass} className="form-control">
          <input
            type="password"
            name="oldPassword"
            value={oldPassword}
            placeholder="Old Password"
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="New Password"
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password2"
            value={password2}
            placeholder="Confirm Password"
            onChange={handleInputChange}
            required
          />
          <button className="--btn --btn-primary" type="submit">
            Change Password
          </button>
        </form>
      </Card>
    </div>
  );
};

export default ChangePassword;
