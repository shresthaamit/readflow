import React from "react";
import "./navbar.css";
import logo from "../images/logo.png";

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
              <a href="#">Newsletter</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">Community</a>
            </li>
          </ul>
          <div className="separator"></div>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer">
              <FaYoutube />
            </a>
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
