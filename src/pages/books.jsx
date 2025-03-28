import React, { useEffect, useState } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import "./books.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Pagination from "../components/pagination";
import { LuDownload } from "react-icons/lu";
import { SlArrowRight } from "react-icons/sl";
import starImage from "../images/star.jpg";
import handleDownloadBook from "../components/download";
function Books() {
  const [selectCategory, setSelectedCategory] = useState(null);
  const [selectAuthor, setSelectedAuthor] = useState(null);

  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreBooks, setHasMoreBooks] = useState(true); // To track if there are more books available

  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search");
  const page = parseInt(searchParams.get("page") || "1");

  // Fetch books based on current page
  useEffect(() => {
    const fetchBooks = async () => {
      const url = new URL("http://localhost:8000/books/");
      const params = {
        page: page,
        search: searchQuery, // Include the search query here
        category: selectCategory,
        author: selectAuthor,
      };
      Object.keys(params).forEach((key) => {
        if (params[key]) url.searchParams.append(key, params[key]);
      });

      const response = await fetch(url);
      const data = await response.json();

      if (data.results.length === 0) {
        setHasMoreBooks(false); // If no books are returned, set hasMoreBooks to false
      } else {
        setHasMoreBooks(true); // Otherwise, there are more books
      }

      setBooks(data.results);
      setTotalPages(data.total_pages);
      setCurrentPage(page);
    };

    fetchBooks();
  }, [page, searchQuery, selectCategory, selectAuthor]);

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category === selectCategory ? null : category);
    navigate(`/books?page=1${category ? `&category=${category}` : ""}`);
  };

  // Handle author change
  const handleAuthorChange = (author) => {
    setSelectedAuthor(author === selectAuthor ? null : author);
    navigate(`/books?page=1${author ? `&author=${author}` : ""}`);
  };
  const handleButtonClick = (bookId) => {
    console.log("Book ID received in handleButtonClick:", bookId); // Log to check the value of bookId
    handleDownloadBook(bookId);
  };
  const categories = [...new Set(books?.map((book) => book.category_name))];
  const authors = [...new Set(books?.map((book) => book.author))];

  const filteredBooks = books?.filter((book) => {
    if (searchQuery) {
      return book.title.toLowerCase().includes(searchQuery.toLowerCase());
    }
    if (selectCategory || selectAuthor) {
      return (
        book.category_name === selectCategory || book.author === selectAuthor
      );
    }
    return true;
  });
  return (
    <>
      <h1 className="title">Find The Perfect Book</h1>
      <div className="booksection">
        <div className="booksearch">
          <div className="category">
            <h1>Book Categories</h1>
            <div className="category-buttons">
              <button
                onClick={() => handleCategoryChange(null)}
                className="category-button"
              >
                All
              </button>
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => handleCategoryChange(category)}
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
                onClick={() => handleAuthorChange(null)}
                className="author-button"
              >
                All
              </button>
              {authors.map((author, index) => (
                <button
                  key={index}
                  onClick={() => handleAuthorChange(author)}
                  className="author-button"
                >
                  {author}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="books">
          {filteredBooks?.map((book) => (
            <div key={book.id}>
              <div className="bookimg">
                <img
                  src={`http://localhost:8000${book.image}`}
                  alt={book.title}
                />
              </div>
              <div className="carddetail">
                <div className="detail1">
                  <img src={starImage} alt="rating star" />
                  <span>{book.average_rate.toFixed(1)}</span>
                  {/* <span className="span">{book.total_ratings}</span> */}
                  {/* <span className="span">{book.category}</span> */}
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
                <button
                  className="buttons"
                  onClick={() => handleButtonClick(book.id)}
                >
                  Download
                  <span>
                    <LuDownload />
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Only show Pagination if there are more books */}
      {hasMoreBooks && (
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      )}
      {!hasMoreBooks && <p>No more books available</p>}
      
    </>
  );
}

export default Books;
