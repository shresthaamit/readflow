import React, { useState, useEffect } from "react";
import "./profile.css";
import axios from "axios";
export default function EditProfile({ onBack, onProfileUpdated }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilepicture: null,
  });
  const [originalData, setOriginalData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      console.log("Token from localStorage:", token);
      console.log(token);
      // if (!token) {
      //   setError("No token found. Please log in.");
      //   return;
      // }

      try {
        console.log("Sending request to fetch profile...");
        const response = await axios.get(
          "http://127.0.0.1:8000/accounts/profile/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        console.log("Profile data retrieved:", response.data);
        const userData = response.data;
        setFormData({ ...userData, password: "", confirmPassword: "" });
        setOriginalData(userData);
        setLoading(false);
      } catch (err) {
        console.log("Error fetching profile:", err);
        if (err.response) {
          console.log("Error response:", err.response);
          if (err.response.status === 401) {
            setError("Unauthorized. Please log in again.");
            localStorage.removeItem("token"); // Remove the invalid token
            window.location.href = "/login"; // Redirect to the login page
          } else {
            setError("Failed to load profile data.");
          }
        } else {
          setError("Failed to load profile data.");
        }
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      profilepicture: e.target.files[0],
    }));
  };
  const handleCancel = () => {
    setFormData({ ...originalData, password: "", confirmPassword: "" });
    setSuccessMessage(""); // Clear any success message
    setError(""); // Clear any error message
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    if (formData.profilepicture) {
      data.append("profile_picture", formData.profilepicture);
    }
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== originalData[key] && formData[key] !== "") {
        data.append(key, formData[key]);
      }
    });
    // console.log("Updating profile with:", formData);
    try {
      const response = await axios.patch(
        "http://127.0.0.1:8000/accounts/profile/",
        data,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccessMessage("Profile updated successfully!");
      setOriginalData(response.data); // Update original data
      setFormData({ ...response.data, password: "", confirmPassword: "" });
      if (onProfileUpdated) onProfileUpdated(response.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert("Unauthorized. Please log in again.");
        // localStorage.removeItem("authToken");
        // window.location.href = "/login";
      } else {
        setError("Failed to update profile. Please try again later.");
      }
    }
  };
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <form onSubmit={handleSubmit} className="edit-profile">
      <label>New Username</label>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      <label>New Email:</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <label>New Password:</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <label>Confirm New Password:</label>
      <input
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
      />
      <label>Profile Picture (Optional):</label>
      <input
        type="file"
        name="profilepicture"
        accept="image/*"
        onChange={handleFileChange}
      />

      {formData.profilepicture && (
        <div className="preview">
          <p>Preview:</p>
          <img
            src={
              typeof formData.profilepicture === "string"
                ? formData.profilepicture
                : URL.createObjectURL(formData.profilepicture)
            }
            alt="Profile Preview"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        </div>
      )}
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <button type="submit" className="update">
        Update Profile
      </button>
      <button type="button" className="cancel" onClick={handleCancel}>
        Cancel
      </button>
      <button type="button" className="back" onClick={onBack}>
        Back to Profile
      </button>
    </form>
  );
}
