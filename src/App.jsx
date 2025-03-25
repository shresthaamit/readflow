import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import ScrollToTop from "./components/ScrollToTop";
import { Component } from "react";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Card from "./components/card";
import Footer from "./components/footer";
import Books from "./pages/books";
import BookDetails from "./pages/booksdetail";
import RecommendBooks from "./components/recommended";
import Profile from "./pages/profile";
import Login from "./pages/login";
import Register from "./pages/register";
import AddBook from "./pages/addbooks";
import StaffBooks from "./pages/viewbook";
import "../src/components/card.css";
import axios from "axios";
import { Routes, Route, Link, useParams } from "react-router-dom";
function Book() {
  return <Books />;
}
// function BookDetail() {
//   return <BookDetails />;
// }
// function RecommendBooksComponent() {
//   return <RecommendBooks />;
// }
function Home() {
  const [cardsData, setCardsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetching data from the Django API (update this to your correct URL)
    axios
      .get("http://127.0.0.1:8000/latest/") // Update to match your actual Django API endpoint
      .then((response) => {
        setCardsData(response.data); // Set the books data
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((err) => {
        setError("Error fetching data");
        setLoading(false);
      });
  }, []); // Empty dependency array means it will run once when the component is mounted

  // Show a loading message or error if necessary
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Base URL for the images
  const baseUrl = "http://127.0.0.1:8000";

  return (
    <>
      <Hero />
      <div className="head-container">
        <h1 className="head">Enticing New Releases</h1>
        <p>Makes the updates feel personalized and thoughtfully selected.</p>
        <div className="cards">
          {cardsData.map((card) => (
            <Card
              key={card.id}
              book={{
                ...card,
                image: `${baseUrl}${card.image}`, // Prepend the base URL to the image path
                qr_code_url: `${baseUrl}${card.qr_code_url}`, // Similarly for the QR code URL
              }}
            />
          ))}
        </div>
      </div>
      <RecommendBooks />
    </>
  );
}
function App() {
  return (
    <div>
      <ScrollToTop />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Book />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account/books" element={<AddBook />} />
        {/* <Route path="/books/staffbooks" element={<StaffBooks />} /> */}
        {/* <Route path="/books/accounts/edit/:id" element={<AddBook />} /> */}
        {/* <Route path="/add-book" element={<AddBook />} /> */}
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
