import React, { useState } from "react";
import ButtonGroup from "../components/ButtonGroup";
import { Link, useNavigate } from "react-router-dom";
import Registerpic from "../images/register.jpg";
import "./loginregister.css";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required.");
      console.log("Please enter a username and email password.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    // setTimeout(() => {
    //   if (formData.username === "existingUser") {
    //     setError("Username already taken.");
    //   } else {
    //     localStorage.setItem(
    //       formData.email,
    //       JSON.stringify({ password: formData.password })
    //     );
    //     setSuccess(true);
    //     console.log("Registration successful");
    //   }
    // }, 500);
    // try {
    //   const response = await fetch("/api/register", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(formData),
    //   });
    //   if (response.ok) {
    //     setSuccess(true);
    //     console.log("Login successful:");
    //   } else {
    //     const data = await response.json();
    //     setError(data.message || "Registration Failed");
    //   }
    // } catch (error) {
    //   setError("An error occurred. Please try again later.");
    // }
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/accounts/register/",
        {
          ...formData,
          password2: formData.confirmPassword, // Make sure confirm password is sent as `password2`
        }
      );
      console.log(response);
      if (response.status === 201) {
        setSuccess(true);
        setMessage("Registration successful!");
        // Optionally store the token
        localStorage.setItem("token", response.data.user_data.token);

        // Redirect to login page
        setTimeout(() => {
          navigate("/login"); // Redirect to login page after 2 seconds
        }, 2000);
      } else {
        setError("registration failed");
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        setError(error.response.data.error || "An error occurred.");
      } else {
        setError("Network error, please try again.");
      }
    }
  };
  const handleCancel = () => {
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setError("");
    setSuccess(false);
  };
  return (
    <div className="loginpage">
      <div className="loginform">
        <h1>Sign Up</h1>
        <p>Register to always be up to date</p>
        <form>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
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
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {/* <input type="submit" value="" /> */}
          <ButtonGroup
            onSubmit={handleRegister}
            onCancel={handleCancel}
            submitLabel="Register"
          />
          {error && <p className="error-message">{error}</p>}
          {success && (
            <p className="success-message">Registration successful!</p>
          )}
        </form>
        <p>
          Registered??{" "}
          <Link to="/login" className="register-link">
            Login
          </Link>
        </p>
      </div>
      <div className="registerimg">
        <img src={Registerpic} alt="" />
      </div>
    </div>
  );
}
