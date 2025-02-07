import React from "react";
import "./navbar.css";
import logo from "../images/logo.png";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaFacebook,
  FaHeadset,
  FaSearch,
  FaUser,
  FaRegUser,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Searchbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handelInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
    // Navigate to the books page with search query as URL parameter
    if (searchQuery) {
      navigate(`/books?search=${searchQuery}`);
    }
    setSearchQuery("");
  };

  return (
    <div className="searchbar">
      <input
        type="text"
        value={searchQuery}
        onChange={handelInputChange}
        placeholder="Enter Book Title"
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleSearch(); // Trigger search on pressing Enter
          }
        }}
      />
      <div onClick={handleSearch} aria-label="Search" className="search-icon">
        <FaSearch />
      </div>
    </div>
  );
}

function Navbar() {
  const [isLoggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token); // Set to true if token exists, false otherwise
  }, []);
  // useEffect(() => {
  //   // Check local storage for login status
  //   const userLoggedIn = localStorage.getItem("userLoggedIn");
  //   setLoggedIn(userLoggedIn === "true");
  // }, []);
  const handleButtonClick = async () => {
    if (isLoggedIn) {
      try {
        await axios.post(
          "http://127.0.0.1:8000/accounts/logout/",
          {},
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );

        // Log out: Remove token and update state
        localStorage.removeItem("token");
        setLoggedIn(false);
        navigate("/login"); // Redirect to login page after logout
      } catch (error) {
        console.error("Logout failed:", error);
      }
    } else {
      // Redirect to login page if not logged in
      navigate("/login");
    }
  };
  return (
    <div className="navbar">
      {" "}
      {/* You can replace this with <header> or <nav> */}
      <div className="navhead">
        <div className="navhead-left">
          <p>Welcome to Readflow</p>
        </div>
        <div className="navhead-right">
          <ul>
            <li className="link1">
              <Link to="/">Home</Link>
            </li>
            <li className="link1">
              <Link to="/books">Books</Link>
            </li>
            <li>
              <button onClick={handleButtonClick}>
                {isLoggedIn ? "Logout" : "Login"}
              </button>
            </li>
          </ul>
          <div className="separator"></div>
          <div className="social-icons">
            <Link to="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebook />
            </Link>
            <Link to="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter />
            </Link>
            <Link to="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram />
            </Link>
            <Link to="https://youtube.com" target="_blank" rel="noreferrer">
              <FaYoutube />
            </Link>
          </div>
        </div>
      </div>
      <div className="navbody">
        <div className="navbodyleft">
          <div className="navimage">
            <img
              src={logo}
              alt="Logo"
              style={{ width: "160px", height: "140px" }}
            />
          </div>
          <div className="separator"></div>
          {/* <div className="callimage">
                    <a href="https://twitter.com" target="_blank" rel="noreferrer">
                  <FaHeadset />
                </a>
                    </div> */}
        </div>

        <div className="navbodyright">
          <div className="navsearch">
            <Searchbar />
          </div>
          <Link to="/profile" className="account-icon" aria-label="Account">
            <FaRegUser />
          </Link>
        </div>
      </div>
      <div className="navtail"></div>
    </div>
  );
}

export default Navbar;
