import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import "../pages/books.css";

const AddToFavorites = ({ bookId, onAlreadyFavorited }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [error, setError] = useState("");

  const handleAddFavorite = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to be logged in to add to favorites.");
      return;
    }

    setIsAdding(true);
    axios
      .post(
        `http://127.0.0.1:8000/books/${bookId}/favourites/`,
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
          onAlreadyFavorited(true); // Trigger parent component logic for already favorited
        } else {
          setError("Failed to add book to favorites.");
        }
      });
  };

  return (
    <div>
      <button
        className="buttons style"
        onClick={handleAddFavorite}
        disabled={isAdding || isFavorite}
      >
        {isFavorite ? (
          <span>
            Added to Favorites
            <BsFillBookmarkHeartFill />
          </span>
        ) : isAdding ? (
          <span>Adding...</span>
        ) : (
          <span>
            Add to favorite{" "}
            <span>
              <BsFillBookmarkHeartFill />
            </span>
          </span>
        )}
      </button>
    </div>
  );
};

export default AddToFavorites;
