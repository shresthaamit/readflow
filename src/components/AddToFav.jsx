import React, { useState } from "react";
import axios from "axios";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import "../pages/books.css";
const AddToFavorites = ({ bookId }) => {
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState("");
  const [alreadyFavorited, setAlreadyFavorited] = useState(false);
  const errorStyle = {
    color: "red",
    fontSize: "14px",
    marginTop: "40px", // Adjust this as necessary for spacing
    fontWeight: "bold",
  };

  const handleAddFavorite = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to be logged in to add to favorites.");
      return;
    }
    setIsAdding(true);
    axios
      .post(
        `http://127.0.0.1:8000/books/${bookId}/favourites/`, // API endpoint for adding to favorites
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((response) => {
        setIsFavorite(true); // Mark as favorite after successful addition
        setIsAdding(false);
        console.log(response);
        console.log("Book Favorite");
      })
      .catch((error) => {
        setIsAdding(false);
        if (error.response && error.response.status === 400) {
          setError("This book is already in your favorites!"); // Handle duplicate
        } else {
          setError("Failed to add book to favorites.");
        }
      });
  };
  return (
    <>
      <div>
        <button
          className="buttons style errorStyle"
          onClick={handleAddFavorite}
          disabled={isAdding || isFavorite}
        >
          {isFavorite ? (
            <span>Added to Favorites</span>
          ) : isAdding ? (
            <span>Adding...</span>
          ) : (
            <span>
              Add to favorite <BsFillBookmarkHeartFill />
            </span>
          )}
        </button>
        <div>
          {alreadyFavorited && !isFavorite && (
            <div className="already-favorited-message-container">
              <p className="already-favorited-message">
                This book is already in your favorites!
              </p>
            </div>
          )}
        </div>
      </div>
      <p> {error && <p style={errorStyle}>{error}</p>}</p>
    </>
  );
};
export default AddToFavorites;
