import React from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import "./books.css";
import books from "./books.json";

function Books() {
  return (
    <>
      <h1 className="title">Find The Perfect Book</h1>
      <div className="booksection">
        <div className="booksearch">
          <h1>Sesg</h1>
        </div>
        <div className="books">
          {books.map((book) => (
            <book>
              <div className="bookimg">
                <img src={book.img} alt={book.bookTitle} />
              </div>
              <div className="carddetail">
                <div className="detail1">
                  <img src={book.star} alt="rating star" />
                  <span>{book.rating}</span>
                  <span className="span">(6) • </span>
                  <span className="span">{book.category}</span>
                </div>

                <p className="author"> {book.author}</p>
              </div>
              <p>
                <span className="book-title">{book.bookTitle}</span>
              </p>
            </book>
          ))}
        </div>
      </div>
    </>
  );
}

export default Books;
