import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./staffbooks.css";

function StaffBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch books from the API
    const fetchBooks = async () => {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage

      if (!token) {
        alert("You are not logged in. Please log in first.");
        window.location.href = "/login"; // Redirect to login page if no token
        return;
      }

      // Adding the Authorization header with the Token (for DRF authentication)
      const response = await fetch(
        "http://127.0.0.1:8000/books/accounts/viewbook/",
        {
          headers: {
            Authorization: `Token ${token}`, // Use 'Token' instead of 'Bearer'
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data); // Log the data for debugging
        setBooks(data); // Assuming data contains the book list directly
      } else {
        console.error(
          "Failed to fetch books:",
          response.status,
          response.statusText
        );
        if (response.status === 401) {
          alert("Unauthorized: Please log in again");
          localStorage.removeItem("token"); // Clear invalid token
          window.location.href = "/login"; // Redirect to login page
        }
      }
    };

    fetchBooks();
  }, []);

  return (
    <>
      <h1 className="staff-books-title">Your Books</h1>
      <div className="staff-booksection">
        <div className="staff-books">
          {books?.length > 0 ? (
            books.map((book) => (
              <div key={book.id} className="staff-book-card">
                <div className="staff-bookimg">
                  <img
                    src={`http://localhost:8000${book.image}`} // Correct image URL
                    alt={book.title}
                  />
                </div>
                <div className="staff-carddetails">
                  <h3>{book.title}</h3>
                  <p className="author">{book.author.split(" ")[0]}</p>
                  <p className="staff-category">{book.category}</p>
                  <p className="staff-rating">{book.rating} / 5</p>
                </div>
                <div className="staff-book-actions">
                  <Link
                    to={`/books/accounts/edit/${book.id}`}
                    className="staff-edit-btn"
                  >
                    <FaEdit /> Edit
                  </Link>
                  <button
                    className="staff-delete-btn"
                    onClick={() => handleDelete(book.id)}
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No books uploaded yet.</p>
          )}
        </div>
      </div>
    </>
  );

  function handleDelete(bookId) {
    // Handle delete book action (you can make an API call here)
    console.log(`Delete book with id: ${bookId}`);
  }
}

export default StaffBooks;
