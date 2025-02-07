import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { LuDownload } from "react-icons/lu";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import RecommendBooks from "../components/recommended";
import placeholderQR from "../images/Defaultqr.png";
import defaults from "../images/default.png";
import axios from "axios";
import "./books.css";
import EditDelete from "../components/editdelete";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState({ results: [] });
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState("");
  const [reviewError, setReviewError] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState("");
  const [visibleReviews, setVisibleReviews] = useState(3);
  const [showMore, setShowMore] = useState(false); // Track whether to show more reviews or less
  const [loggedInUsername, setLoggedInUsername] = useState(null); // Store logged-in user's username
  const [editingReview, setEditingReview] = useState(null);
  const reviewFormRef = useRef(null); // Create a ref for the review form
  const textareaRef = useRef(null);
  const [highlight, setHighlight] = useState(false);
  // Fetch the logged-in user's username
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://127.0.0.1:8000/accounts/checkstatus/", {
          headers: { Authorization: `Token ${token}` },
        })
        .then((response) => {
          setLoggedInUsername(response.data.detail.username);
          console.log(response.data.detail.username); // Store the logged-in user's username
        })
        .catch((error) => {
          setLoggedInUsername(null); // Handle case where the user is not logged in
        });
    }
  }, []);

  // Fetch book details and reviews on component mount
  useEffect(() => {
    // Fetch book detai
    // ls
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
        const sortedReviews = response.data.results.sort((a, b) => {
          if (a.rate_user === loggedInUsername) return -1;
          if (b.rate_user === loggedInUsername) return 1;
          return 0;
        });
        setReviews({ results: sortedReviews });

        // Check if the user has already reviewed the book
        const userReviewed = response.data.results.some(
          (review) => review.rate_user === loggedInUsername
        );
        if (userReviewed) {
          setReviewError("You have already reviewed this book.");
        }
      })
      .catch((error) => {
        setReviews({ results: [] });
      });
  }, [id, loggedInUsername]);

  // Review submission handler
  const submitReview = (e) => {
    // If the user has already reviewed the book, do not allow submitting a new review
    // if (reviewError) {
    //   setReviewError("You have already reviewed this book.");
    //   return;
    // }
    if (editingReview) {
      // Edit existing review
      const reviewData = {
        rate: Number(rating),
        review: newReview,
      };

      axios
        .put(
          `http://127.0.0.1:8000/books/review/${editingReview}/`,
          reviewData,
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          const updatedReviews = reviews.results.map((review) =>
            review.id === editingReview ? response.data : review
          );
          setReviews({ results: updatedReviews });
          setEditingReview(null); // Reset editing state
          setNewReview("");
          setRating("");

          setReviewSuccess("Review updated successfully!");

          setTimeout(() => {
            setReviewSuccess(""); // Clear the success message after 4 seconds
          }, 2000);
        })
        .catch((error) => {
          setReviewError("Failed to update review.");
        });
    } else {
      const reviewData = {
        rate: Number(rating),
        review: newReview,
      };

      if (!rating || !newReview) {
        setReviewError("Enter both review and rating.");
        return;
      }

      axios
        .post(`http://127.0.0.1:8000/books/${id}/review-create/`, reviewData, {
          headers: { Authorization: `Token ${localStorage.getItem("token")}` },
        })
        .then((response) => {
          const updatedReviews = [response.data, ...reviews.results];
          const sortedReviews = updatedReviews.sort((a, b) => {
            if (a.rate_user === loggedInUsername) return -1;
            if (b.rate_user === loggedInUsername) return 1;
            return 0;
          });
          setReviews({ results: sortedReviews });
          setNewReview("");
          setRating("");
          setReviewSuccess("Review added successfully!");
          setReviewError(""); // Clear error if submission is successful
        })
        .catch((error) => {
          setReviewError("Failed to submit review.");
        });
    }
  };
  axios.get();
  // Toggle between "Show More" and "Show Less" reviews

  const handleEdit = (reviewId) => {
    const review = reviews.results.find((review) => review.id === reviewId);
    setEditingReview(reviewId);
    setNewReview(review.review);
    setRating(String(review.rate));
    if (reviewFormRef.current) {
      reviewFormRef.current.scrollIntoView({ behavior: "smooth" });
      setHighlight(true); // Set highlight to true
      setTimeout(() => setHighlight(false), 2000); // Remove highlight after 2 seconds
    }
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  // Handle delete review
  const handleDelete = (reviewId) => {
    // Show confirmation before deleting (optional)
    if (window.confirm("Are you sure you want to delete your review?")) {
      // Send DELETE request to the API to delete the review
      axios
        .delete(`http://127.0.0.1:8000/books/review/${reviewId}/`, {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          // Successfully deleted review
          setReviews({
            results: reviews.results.filter((review) => review.id !== reviewId),
          });

          // Reset the "You have already reviewed this book." message
          setReviewError(""); // Clear the error message after successful deletion
          setReviewSuccess("Review deleted successfully!");

          // Optionally, hide the success message after a few seconds
          setTimeout(() => {
            setReviewSuccess(""); // Clear success message after 4 seconds
          }, 4000);
        })
        .catch((error) => {
          // Handle error if the deletion fails
          setReviewError("Failed to delete review. Please try again.");
        });
    }
  };

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

          <div className="ratesection">
            <div className="ratereview" ref={reviewFormRef}>
              <textarea
                ref={textareaRef}
                className={highlight ? "highlight" : ""}
                placeholder="Enter a review"
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                autoFocus
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
              {reviewError && <p className="error-message">{reviewError}</p>}
              {reviewSuccess && (
                <p className="success-message">{reviewSuccess}</p>
              )}
            </div>

            <div className="qr-section">
              <img
                src={
                  book.qr_code
                    ? `http://127.0.0.1:8000${book.qr_code}`
                    : placeholderQR
                }
                alt="QR Code"
                style={{
                  maxWidth: "128px",
                  width: "100%",
                  padding: "16px",
                  background: "white",
                }}
              />
            </div>
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

                {/* Show Edit and Delete buttons only for the logged-in user */}
                {loggedInUsername === review.rate_user && (
                  <EditDelete
                    onEdit={() => handleEdit(review.id)} // Pass the review ID for editing
                    onDelete={() => handleDelete(review.id)} // Pass the review ID for deletion
                  />
                )}
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
