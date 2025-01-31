import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import books from "./books.json";
import { LuDownload } from "react-icons/lu";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import reviews from "./reviews.json";
import "./books.css";
import RecommendBooks from "../components/recommended";
// import QRCode from "qrcode.react";
import placeholderQR from "../images/qr.png";
import axios from "axios";
export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState("");
  const [reviewError, setReviewError] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState("");

  // const book = books.find((b) => b.id === parseInt(id));
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/books/${id}/`) // Replace with your API endpoint
      .then((response) => {
        setBook(response.data); // Set the book data from API
        setIsLoading(false);
        console.log(response);
      })
      .catch((error) => {
        setError("Failed to fetch book details. Please try again.");
        setIsLoading(false);
      });

    axios
      .get(`http://127.0.0.1:8000/books/${id}/review-create/`)
      .then((response) => {
        setReviews(response.data);
      })
      .catch(() => {
        setReviews([]);
      });
  }, [id]);

  const submitReview = () => {
    const reviewData = {
      rate: rating,
      review: newReview, // Ensure this matches the backend field name
    };

    console.log("Submitting Review Data:", reviewData);
    if (!rating || !newReview) {
      setReviewError("Please enter both a review and a rating.");
      return;
    }

    axios
      .post(
        `http://127.0.0.1:8000/books/${id}/review-create/`,
        { rate: rating, text: newReview },
        {
          headers: { Authorization: `Token ${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        // console.log("Review submitted:", response.data);
        setReviews([...reviews, response.data]); // Append the new review
        // console.log(response.data);
        setNewReview("");
        setRating("");
        setReviewSuccess("Review added successfully!");
        setReviewError("");
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setReviewError(
            error.response.data.detail || "Failed to submit review."
          );
        } else {
          setReviewError("Failed to submit review.");
        }
      });
  };
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!book) {
    return <p>No Book found</p>;
  }
  return (
    <div className="detailpage">
      {/* <h2>Book Details</h2> */}
      <div className="bookdetail">
        <div className="bookimgs">
          <img src={`http://localhost:8000${book.image}`} alt={book.title} />
        </div>
        <div className="detail">
          <h1>"{book.title}"</h1>
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
          <div className="ratesection">
            <div className="ratereview">
              <textarea
                placeholder="Enter a review"
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
              />
              <div className="rating-submit">
                <select
                  name="rating"
                  className="rating-dropdown"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value="">Rate</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button
                  type="button"
                  className="action send-button"
                  onClick={submitReview}
                >
                  Send
                </button>
                <Link to="/books" className="action back-button">
                  Go to Books
                </Link>
              </div>
            </div>
            {/* <div className="qrsection"> */}
            <div className="qr-section">
              {/* <h4>QR Code</h4> */}
              <img
                src={placeholderQR}
                alt="QR Code Placeholder"
                style={{
                  maxWidth: "128px",
                  width: "100%",
                  padding: "16px",
                  background: "white",
                }}
              />
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
      <RecommendBooks />
      <div class="reviewdetailsection">
        <AllReview reviews={reviews} />
      </div>

      {/* <p>Book ID: {id}</p> */}
      {/* <p>Author: {book.author }</p> */}
    </div>
  );
}

function AllReview({ reviews }) {
  const [showAll, setShowAll] = useState(false);
  const reviewToShow = showAll ? reviews : reviews.slice(0, 3);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="reviewdetailsection">
      <h1>Review of other readers</h1>
      {reviewToShow.map((review, index) => (
        <div key={index} className="review">
          <div className="userimg">
            <img src={review.img} alt="User Image" />
          </div>
          <div className="userdetail">
            <div className="namedate">
              <h4>{review.username}</h4>
              <span>2022-01-01</span>
            </div>
            <h3>Rating: {review.rating}/5</h3>
            <p>{review.text}</p>
          </div>
        </div>
      ))}

      {/* "See More" / "See Less" Button */}
      <div className="button-container">
        {reviews.length > 3 && (
          <button onClick={toggleShowAll} className="toggle-button">
            {showAll ? "See Less" : "See More"}
          </button>
        )}
      </div>
    </div>
  );
}
