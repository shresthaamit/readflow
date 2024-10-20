import React from "react";
import "./navbar.css";
import logo from "../images/logo.png";

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
import { useState } from "react";

function Searchbar() {
  const [searchQuery, setSearchQuery] = useState("");

  const handelInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
    setSearchQuery("");
  };

  return (
    <div className="searchbar">
      <input
        type="text"
        value={searchQuery}
        onChange={handelInputChange}
        placeholder="Enter search query"
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
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/books">Books</Link>
            </li>
            <li>
              <Link to="#">Community</Link>
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
          <div className="account-icon" aria-label="Account">
            <FaRegUser />
          </div>
        </div>
      </div>
      <div className="navtail"></div>
    </div>
  );
}

export default Navbar;
