import React from "react";
import book from "../images/Working.gif"; // Default book image
// import "./card.css";
import { SlArrowRight } from "react-icons/sl";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./DownloadCard.css";

export default function DownloadCard({
  book,
  isProfilePage,
  removeFromDownloads,
}) {
  console.log("the downloaded book is", book);

  return (
    <>
      <div className="cards">
        <div className="card">
          <img
            src={
              book.image
                ? `http://localhost:8000${book.image}`
                : "../images/Working.gif"
            }
            alt={book.title || "Book Cover"}
          />

          <div className="title-author-container">
            <p className="left-part">
              <span className="spanbold">{book.title || "Untitled Book"}</span>
            </p>
            <p className="right-part">By: {book.author || "Unknown Author"}</p>
          </div>
          <div className="bookbuttonss buttonss">
            <Link to={`/books/${book.book_id}`} className="buttons">
              Detail
              <span>
                <SlArrowRight />
              </span>
            </Link>

            {/* Show Remove from Downloads only if on profile page */}
            {isProfilePage && (
              <button
                className="remove-download-btn"
                onClick={() => {
                  console.log(
                    "Remove button clicked for book ID:",
                    book.book_id
                  );
                  removeFromDownloads(book.book_id);
                }}
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
