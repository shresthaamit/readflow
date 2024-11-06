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
import "../src/components/card.css";
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
  const cardsData = [
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
  ];

  return (
    <>
      <Hero />
      <div className="head-container">
        <h1 className="head"> Enticing New Releases</h1>
        <p>Makes the updates feel personalized and thoughtfully selected.</p>
        <div className="cards">
          {cardsData.map((card) => (
            <Card key={card.id} book={card} />
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
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
