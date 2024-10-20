import React from "react";
import "./footer.css";
import logo from "../images/logo.png";
import { FaInstagram, FaYoutube, FaTwitter, FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <div className="footer-container">
      <div className="social-container">
        <hr />
        <Link
          to="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </Link>
        <Link
          to="https://www.youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaYoutube />
        </Link>
        <Link
          to="https://www.twitter.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter />
        </Link>
        <Link
          to="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook />
        </Link>
        <hr />
      </div>
      <div className="footermiddle">
        <div className="footerlogo">
          <img src={logo} alt="" />
        </div>
        <div className="footercontent">
          <p>
            <span>&#169;</span> 2022 Readflow. All rights reserved.
          </p>
        </div>
      </div>
      <div className="footerlink">
        <ul>
          <li>
            <Link href="#">Newsletter</Link>
          </li>
          <span className="separator"></span>
          <li>
            <Link to="#">Contact Us</Link>
          </li>
          <span className="separator"></span>
          <li>
            <Link to="#">Community</Link>
          </li>
          <span className="separator"></span>
          <li>
            <Link to="#">Community</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
