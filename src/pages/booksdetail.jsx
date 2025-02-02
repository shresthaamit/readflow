import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { LuDownload } from "react-icons/lu";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import RecommendBooks from "../components/recommended";
import placeholderQR from "../images/qr.png";
import defaults from "../images/default.png";
import axios from "axios";
import "./books.css";

export default function BookDetails() {
  const { id } = useParams(); // Get book ID from URL params
  const [book, setBook] = useState(null); // Book details state
  const [isLoading, setIsLoading] = useState(true); // Loading state for API request
  const [error, setError] = useState(null); // Error state for API request
  const [reviews, setReviews] = useState({ results: [] }); // Reviews state
  const [newReview, setNewReview] = useState(""); // New review text state
  const [rating, setRating] = useState(""); // Rating state
  const [reviewError, setReviewError] = useState(""); // Error state for review submission
  const [reviewSuccess, setReviewSuccess] = useState(""); // Success state for review submission
  const [visibleReviews, setVisibleReviews] = useState(3); // Number of reviews to show initially
  const [showMore, setShowMore] = useState(false); // Track whether to show more reviews or less

  // Fetch book details and reviews on component mount
  useEffect(() => {
    // Fetch book details
    axios
      .get(`http://127.0.0.1:8000/books/${id}/`) // Fetch book details from API
      .then((response) => {
        setBook(response.data); // Set book data from API
        setIsLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch book details. Please try again.");
        setIsLoading(false);
      });

    // Fetch reviews for the book
    axios
      .get(`http://127.0.0.1:8000/books/${id}/review/`, {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        setReviews({ results: [] });
      });
  }, [id]);

  // Review submission handler
  const submitReview = () => {
    const reviewData = {
      rate: Number(rating), // Ensure the rate is a number (1-5)
      review: newReview, // The review text (change from 'text' to 'review')
    };

    // Validation: Ensure both rating and review text are provided
    if (!rating || !newReview) {
      setReviewError(
        <p className="ml-7" color="red">
          Enter both review and rating.
        </p>
      );
      return;
    }

    // Send POST request to submit the review
    axios
      .post(`http://127.0.0.1:8000/books/${id}/review-create/`, reviewData, {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` }, // Send auth token
      })
      .then((response) => {
        // After submitting, add the new review to the list of reviews (no need to refresh)
        setReviews((prevReviews) => [response.data, ...prevReviews]); // Add new review to the list

        // Reset form fields after successful submission
        setNewReview("");
        setRating("");
        setReviewSuccess("Review added successfully!");
        setReviewError(""); // Clear any previous error
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

  // Toggle between "Show More" and "Show Less" reviews
  const toggleReviews = () => {
    if (showMore) {
      setVisibleReviews(3); // Reset to 3 reviews when showing less
      setShowMore(false); // Set flag to false for "Show More"
    } else {
      setVisibleReviews(reviews.results.length); // Show all reviews
      setShowMore(true); // Set flag to true for "Show Less"
    }
  };

  // Loading state or error handling when data is still loading
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
        </div>
      </div>
      <RecommendBooks />
      <div className="reviewdetailsection">
        <h2>Review of other readers</h2>
        {reviews.results.length > 0 ? (
          reviews.results.slice(0, visibleReviews).map((review, index) => (
            <div key={index} className="review">
              <div className="userimg">
                <img
                  src={
                    review.profile_picture
                      ? `http://localhost:8000${review.profile_picture}`
                      : defaults // Use placeholder if no image
                  }
                  alt="User Image"
                />
              </div>
              <div className="userdetail">
                <div className="namedate">
                  <h4>{review.rate_user}</h4>
                  <span>
                    {new Date(review.created_at).toLocaleDateString()}
                  </span>
                </div>
                <h3>Rating: {review.rate}/5</h3>
                <p>{review.review || "No review text provided."}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
        {/* Show more/less button */}
        {reviews.results.length > 3 && (
          <button
            className={`show-more toggle-reviews-button`}
            onClick={toggleReviews}
          >
            {showMore ? "Show Less" : "Show More"}
          </button>
        )}
      </div>
    </div>
  );
}
