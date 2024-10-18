import React from "react";
import "./footer.css";
import logo from "../images/logo.png";
import { FaInstagram, FaYoutube, FaTwitter, FaFacebook } from "react-icons/fa";
export default function Footer() {
  return (
    <div className="footer-container">
      <div className="social-container">
        <hr />
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </a>
        <a
          href="https://www.youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaYoutube />
        </a>
        <a
          href="https://www.twitter.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter />
        </a>
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook />
        </a>
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
            <a href="#">Newsletter</a>
          </li>
          <span className="separator"></span>
          <li>
            <a href="#">Contact Us</a>
          </li>
          <span className="separator"></span>
          <li>
            <a href="#">Community</a>
          </li>
          <span className="separator"></span>
          <li>
            <a href="#">Community</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
