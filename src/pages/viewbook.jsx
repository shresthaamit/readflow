import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./staffbooks.css";
import axios from "axios"; // Import axios to make the delete request

function StaffBooks({ changeActive, setEditId }) {
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

  const handleStaffEdit = (bookId) => {
    changeActive("addbook");
    setEditId(bookId);
  };

  const handleDelete = async (bookId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this book? This action cannot be undone."
    );

    if (!confirmed) {
      return; // If user cancels, do nothing
    }

    try {
      await axios.delete(`http://127.0.0.1:8000/books/accounts/${bookId}/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });

      // Filter out the deleted book from the list
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
      alert("Book deleted successfully!");
    } catch (err) {
      alert("Failed to delete book. Please try again later.");
    }
  };

  return (
    <>
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
                  <p className="staff-category">{book.category.name}</p>
                </div>
                <div className="staff-book-actions">
                  <button
                    className="staff-edit-btn"
                    onClick={() => handleStaffEdit(book.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="staff-delete-btn"
                    onClick={() => handleDelete(book.id)} // Pass the bookId to handleDelete
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
}

export default StaffBooks;
