import React, { useState } from "react";
import ButtonGroup from "../components/ButtonGroup";
import Loginpic from "../images/login.jpg";
import "./loginregister.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    setError("");
    setSuccess(false);
  };
  const handleRegisterRedirect = () => {
    // Redirect to the register page when the user clicks on 'Sign Up'
    navigate("/register");
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      console.log("Please fill in all fields");
      return;
    }
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/accounts/login/",
        {
          username: formData.email,
          password: formData.password,
        }
      );
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        setSuccess(true);
        setTimeout(() => navigate("/"), 2000);
      } else {
        setError("Login failed");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Invalid email or password");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
    // const storedUser = JSON.parse(localStorage.getItem(formData.email));
    // if (storedUser && storedUser.password === formData.password) {
    //   console.log("Login successful");
    //   setSuccess(true);
    // } else {
    //   setError("Invalid email or password");
    //   console.log("Invalid email or password");
    //   return;
    // }
    // Add your login logic here
  };
  const handleCancel = () => {
    setFormData({
      email: "",
      password: "",
    });
    setError("");
    setSuccess(false);
  };
  return (
    <div className="loginpage">
      <div className="loginform">
        <h1>Login</h1>
        <p>Welcome!The world of book is waiting for you</p>
        <form>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {/* <input type="submit" value="Login" /> */}
          <ButtonGroup
            onSubmit={handleLogin}
            onCancel={handleCancel}
            submitLabel="Login"
          />
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">Login successful!</p>}
        </form>
        <p>
          Don't have an account?{" "}
          <Link to="/register" className="register-link">
            Sign Up
          </Link>
        </p>
      </div>

      <div className="loginimg">
        <img src={Loginpic} alt="" />
      </div>
    </div>
  );
}
