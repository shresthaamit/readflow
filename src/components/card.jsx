import React from "react";
import book from "../images/Working.gif";
import star from "../images/star.jpg";
import "./card.css";
import { SlArrowRight } from "react-icons/sl";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
export default function Card({ book }) {
  return (
    <>
      <div className="cards">
        <div className="card">
          <img src={book.img} alt="Working" />
          <div className="carddetail">
            <div className="left-section">
              <img src={book.star} alt="ratestar" />
              <span>{book.rating}</span>
              <span className="span">(6)</span>
            </div>
            <div className="right-section">
              <span className="span">• {book.category}</span>
            </div>
          </div>
          <div className="title-author-container">
            <p className="left-part">
              <span className="spanbold">{book.bookTitle}</span>
            </p>
            <p className="right-part">By: {book.author}</p>
          </div>
          <div className="bookbuttons">
            <Link to={`/books/${book.id}`} className="buttons">
              Detail
              <span>
                <SlArrowRight />
              </span>
            </Link>
            <Link to="button" className="buttons">
              Add to favourite
              <span>
                <BsFillBookmarkHeartFill />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
