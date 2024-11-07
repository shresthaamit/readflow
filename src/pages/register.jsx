import React from "react";
import ButtonGroup from "../components/ButtonGroup";
import Registerpic from "../images/register.jpg";
import "./loginregister.css";

export default function Register() {
  const handleRegister = () => {};
  const handleCancel = () => {};
  return (
    <div className="loginpage">
      <div className="loginform">
        <h1>Sign Up</h1>
        <p>Register to always be up to date</p>
        <form>
          <label>Username:</label>
          <input type="text" name="" id="" />
          <label>Email:</label>
          <input type="email" required />
          <label>Password:</label>
          <input type="password" required />
          <label>Confirm Password:</label>
          <input type="password" required />
          {/* <input type="submit" value="" /> */}
        </form>
        <ButtonGroup
          onSubmit={handleRegister}
          onCancel={handleCancel}
          submitLabel="Register"
        />
      </div>
      <div className="registerimg">
        <img src={Registerpic} alt="" />
      </div>
    </div>
  );
}
