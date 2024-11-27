import { useState, useEffect } from "react";
import Card from "./card";
import "./card.css";
import axios from "axios"; // Import Axios
import { useNavigate } from "react-router-dom";
import { Routes, Route, Link, useParams } from "react-router-dom";
const recommendedBooks = [
  {
    id: 2,
    img: "../src/images/darlings.jfif",
    name: "Working",
    author: "Barbara Cartland",
    rating: "5.0",
    star: "../src/images/star.jpg",
    category: "Technology",
    bookTitle: "Book Title",
    details:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages",
  },

  {
    id: 4,
    img: "../src/images/hollow.jfif",
    name: "Working",
    author: "J. K. Rowling",
    rating: "5.0",
    star: "../src/images/star.jpg",
    category: "Science",
    bookTitle: "Book Title",
    details:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages",
  },
  {
    id: 1,
    img: "../src/images/banned.jfif",
    name: "Working",
    author: "J. K. Rowling",
    rating: "7.0",
    star: "../src/images/star.jpg",
    category: "Science",
    bookTitle: "Book Title",
    details:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages",
  },
  {
    id: 3,
    img: "../src/images/douglass.png",
    name: "Working",
    author: "Danielle Steel",
    rating: "5.0",
    star: "../src/images/star.jpg",
    category: "Engineering",
    bookTitle: "Book Title",
    details:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages",
  },
];

export default function RecommendBooks() {
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchRecommendBooks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/books/recommend/",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Add token for authentication
            },
          }
        );
        setRecommendedBooks(response.data);
      } catch (error) {
        console.error("Error fetching recommended books:", error);
      }
    };
    fetchRecommendBooks();
  }, []);
  return (
    <div className="head-container">
      <h1 className="head"> Top Recommendations for You</h1>
      <p>Must-Reads of the Month – Handpicked & Updated</p>
      <div className="cards">
        {/* {recommendedBooks.map((book) => (
          <Card key={book.id} book={book} />
        ))} */}
        {recommendedBooks.map((book) => (
          <Card
            key={book.id}
            book={book}
            onClick={() => navigate(`/books/${book.id}`)}
          >
            Go to {book.bookTitle}
          </Card>
        ))}
      </div>
    </div>
  );
}
