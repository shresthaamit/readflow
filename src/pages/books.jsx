import React from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import "./books.css";
import { Link } from "react-router-dom";
import books from "./books.json";
import { useState } from "react";
import { SlArrowRight } from "react-icons/sl";
import { BsFillBookmarkHeartFill } from "react-icons/bs";

function Books({ book }) {
  const categories = [...new Set(books.map((book) => book.category))];
  const authors = [...new Set(books.map((book) => book.author))];
  // console.log(categories);
  const [selectcategory, setSelectedCategory] = useState(null);
  const [selectauthor, setSelectedAuthor] = useState(null);
  // const filteredbooks = selectcategory
  //   ? books.filter((book) => book.category === selectcategory)
  //   : books;

  // const authorbooks = selectauthor
  //   ? books.filter((book) => book.author === selectauthor)
  //   : books;

  const filteredbooks = books.filter((book) => {
    if (selectcategory || selectauthor) {
      return book.category === selectcategory || book.author === selectauthor;
    } else if (selectcategory) {
      return book.category === selectcategory;
    } else if (selectauthor) {
      return book.author === selectauthor;
    } else {
      return true;
    }
  });
  const handleclick = (category) => {
    setSelectedCategory(category === selectcategory ? null : category);
  };

  const handleAuthorbuttons = (author) => {
    setSelectedAuthor(author === selectauthor ? null : author);
  };
  return (
    <>
      <h1 className="title">Find The Perfect Book</h1>
      <div className="booksection">
        <div className="booksearch">
          <div className="category">
            <h1>Book Categories</h1>
            <div className="category-buttons">
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedAuthor(null);
                }}
                className="category-button"
              >
                All
              </button>
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => handleclick(category)}
                  className="category-button"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div className="popularauthor">
            <h1>Popular Authors</h1>
            <div className="author-buttons">
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedAuthor(null);
                }}
                className="author-button"
              >
                All
              </button>
              {authors.map((author, index) => (
                <button
                  key={index}
                  onClick={() => handleAuthorbuttons(author)}
                  className="author-button"
                >
                  {author}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="books">
          {filteredbooks.map((book) => (
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

                <p className="author"> {book.author.split(" ")[0]}</p>
              </div>
              <p>
                <span className="book-title">{book.bookTitle}</span>
              </p>
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
            </book>
          ))}
        </div>
      </div>
    </>
  );
}

export default Books;
