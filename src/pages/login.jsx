import React, { useState } from "react";
import ButtonGroup from "../components/ButtonGroup";
import Loginpic from "../images/login.jpg";
import "./loginregister.css";
export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
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
  const handleLogin = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      console.log("Please fill in all fields");
      return;
    }
    const storedUser = JSON.parse(localStorage.getItem(formData.email));
    if (storedUser && storedUser.password === formData.password) {
      console.log("Login successful");
      setSuccess(true);
    } else {
      setError("Invalid email or password");
      console.log("Invalid email or password");
      return;
    }
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
      </div>
      <div className="loginimg">
        <img src={Loginpic} alt="" />
      </div>
    </div>
  );
}
