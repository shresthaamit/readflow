import React from "react";
import ButtonGroup from "../components/ButtonGroup";
import Loginpic from "../images/login.jpg";
import "./loginregister.css";
export default function Login() {
  const handleLogin = (event) => {
    event.preventDefault();
    // Add your login logic here
    console.log("Login successful");
  };
  const handleCancel = (event) => {};
  return (
    <div className="loginpage">
      <div className="loginform">
        <h1>Login</h1>
        <p>Welcome!The world of book is waiting for you</p>
        <form>
          <label>Email:</label>
          <input type="email" required />
          <label>Password:</label>
          <input type="password" required />
          <input type="submit" value="Login" />
        </form>
        <ButtonGroup
          onSubmit={handleLogin}
          onCancel={handleCancel}
          submitLabel="Login"
        />
      </div>
      <div className="loginimg">
        <img src={Loginpic} alt="" />
      </div>
    </div>
  );
}
