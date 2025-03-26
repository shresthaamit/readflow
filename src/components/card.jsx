import React from "react";
import book from "../images/Working.gif";
import star from "../images/star.jpg";
import "./card.css";
import { SlArrowRight } from "react-icons/sl";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
export default function Card({ book, isProfilePage, removeFromFavorites }) {
  console.log("the books are", book);

  return (
    <>
      <div className="cards">
        <div className="card">
          <img
            src={book.image ? book.image : "../images/Working.gif"}
            alt={book.title || "Book Cover"}
          />

          <div className="title-author-container">
            <p className="left-part">
              <span className="spanbold">{book.title || "Untitled Book"}</span>
            </p>
            <p className="right-part">By: {book.author || "Unknown Author"}</p>
          </div>
          <div className="bookbuttons buttonss">
            <Link to={`/books/${book.id}`} className="buttons">
              Detail
              <span>
                <SlArrowRight />
              </span>
            </Link>
            {!isProfilePage && (
              <Link to="button" className="buttons">
                Add to favourite
                <span>
                  <BsFillBookmarkHeartFill />
                </span>
              </Link>
            )}

            {/* Show Remove from Favorite only if on profile page */}
            {isProfilePage && (
              <button
                className="remove-favorite-btn"
                onClick={() => removeFromFavorites(book.id)}
              >
                Remove
                <span>
                  <BsFillBookmarkHeartFill />
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
