import React, { useState, useEffect } from "react";
import "./profile.css";
export default function EditProfile({ onBack }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilepicture: null,
  });

  const [originalData, setOriginalData] = useState({});
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userData")) || {
      username: "",
      email: "",
    };
    setFormData(storedUser);
    setOriginalData(storedUser);
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...storedUser, [name]: value });
  };
  // const handleFileChange = () => {
  //   setFormData({ ...formData, profilepicture: e.target.files[0] });
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== originalData[key]) {
        updatedData[key] = formData[key];
      }
    });
    console.log("Updating profile with:", updatedData);
    localStorage.setItem(
      "userData",
      JSON.stringify({ ...originalData, ...updatedData })
    );
  };
  return (
    <form onSubmit={handleSubmit} className="edit-profile">
      <label>Usename</label>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
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
      <button className="update" type="submit">Update Profile</button>
      <button
        type="button"
        className="cancel"
        onClick={() => setFormData(originalData)}
      >
        Cancel
      </button>
      <button className="back" onClick={onBack}>
        Back to Profile
      </button>
    </form>
  );
}
