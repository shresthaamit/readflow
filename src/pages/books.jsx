import React, { useEffect } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import "./books.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import books from "./books.json";
import { useState } from "react";
import { LuDownload } from "react-icons/lu";
import { SlArrowRight } from "react-icons/sl";
import { BsFillBookmarkHeartFill } from "react-icons/bs";

function Books() {
  // console.log(categories);
  const [selectcategory, setSelectedCategory] = useState(null);
  const [selectauthor, setSelectedAuthor] = useState(null);
  const [books, setBooks] = useState(null);
  const location = useLocation();
  const navigate = useNavigate(); // For updating URL without reloading the page
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search");
  const categories = [...new Set(books?.map((book) => book.category))];
  const authors = [...new Set(books?.map((book) => book.author))];

  const filteredbooks = books?.filter((book) => {
    if (searchQuery) {
      return book.title.toLowerCase().includes(searchQuery.toLowerCase()); // Filter by title
    }
    if (selectcategory || selectauthor) {
      return book.category === selectcategory || book.author === selectauthor;
    }
    return true;
  });

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch("http://localhost:8000/books/");
      const data = await response.json();
      // console.log(data);
      setBooks(data.results);
    };
    fetchBooks();
  }, []);

  const handleclick = (category) => {
    setSelectedCategory(category === selectcategory ? null : category);
    if (category === null && selectauthor === null) {
      // Reset the search query when "All" is clicked
      navigate("/books"); // This will remove the search query from the URL
    }
  };

  const handleAuthorbuttons = (author) => {
    setSelectedAuthor(author === selectauthor ? null : author);
    if (author === null && selectcategory === null) {
      // Reset the search query when "All" is clicked
      navigate("/books"); // This will remove the search query from the URL
    }
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
                  navigate("/books");
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
                  navigate("/books");
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
          {filteredbooks?.map((book) => (
            <book>
              <div className="bookimg">
                <img
                  src={`http://localhost:8000${book.image}`}
                  alt={book.title}
                />

                {/* <img src={book.image} alt={book.bookTitle} /> */}
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
                <span className="book-title">{book.title}</span>
              </p>
              <div className="bookbuttons">
                <Link to={`/books/${book.id}`} className="buttons">
                  Detail
                  <span>
                    <SlArrowRight />
                  </span>
                </Link>
                <Link to="button" className="buttons">
                  Download
                  <span>
                    <LuDownload />
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
