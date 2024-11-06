import React from "react";
import "./hero.css";
import heroImg1 from "../images/ebook1.gif";
import heroImg3 from "../images/ebook2.gif";
import heroImg2 from "../images/ebook3.gif";
import { Link } from "react-router-dom";

function Hero() {
  const images = [heroImg1, heroImg2, heroImg3];
  return (
    <div className="hero">
      <div className="heroleft">
        <h1 className="title">
          <p className="appname">Readflow : </p>
          <p className="apppara">A modern and user-friendly news reader app</p>
        </h1>
        <p className="para">
          Discover the latest news, articles, and updates from around the world.
          Stay up-to-date with your favorite sources and stay informed about the
          world's events and happenings.
        </p>
        <Link to="/books" className="button">
          Go to Books Page
        </Link>
      </div>
      <div className="heroright">
        <div className="image-grid">
          {images.map((image, index) => (
            <img key={index} src={image} alt={`Image ${index + 1}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
export default Hero;
