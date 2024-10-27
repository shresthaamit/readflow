import React from "react";
import { useParams } from "react-router-dom";
import books from "./books.json";
import { LuDownload } from "react-icons/lu";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import "./books.css";
export default function BookDetails() {
  const { id } = useParams();
  const book = books.find((b) => b.id === parseInt(id));
  if (!book) {
    return <p>No Book found</p>;
  }
  return (
    <div className="detailpage">
      {/* <h2>Book Details</h2> */}
      <div className="bookdetail">
        <div className="bookimg">
          <img src={book.img} alt={book.title} />
        </div>
        <div className="detail">
          <h1>"{book.bookTitle}"</h1>
          <h3>{book.author}</h3>
          <h5>{book.rating}</h5>
          <p>{book.details}</p>
          <div className="bookbuttons">
            <button className="buttons ">
              Download
              <span>
                <LuDownload />
              </span>
            </button>
            <button className="buttons style">
              Add to favourite
              <span>{<BsFillBookmarkHeartFill />}</span>
            </button>
          </div>
        </div>
      </div>

      {/* <p>Book ID: {id}</p> */}
      {/* <p>Author: {book.author}</p> */}
    </div>
  );
}
