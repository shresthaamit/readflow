import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import { Component } from "react";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Card from "./components/card";
import Footer from "./components/footer";
import Books from "./pages/books";
// import "../src/components/card.css";
import { Routes, Route, Link, useParams } from "react-router-dom";
function Book() {
  return <Books />;
}

function Home() {
  const cardsData = [
    {
      img: "../src/images/Working.gif",
      name: "Working",
      author: "Author",
      rating: "7.0",
      star: "../src/images/star.jpg",
      category: "Category",
      bookTitle: "Book Title",
    },
    {
      img: "../src/images/heroimg1.jpg",
      name: "Working",
      author: "Author",
      rating: "5.0",
      star: "../src/images/star.jpg",
      category: "Category",
      bookTitle: "Book Title",
    },
    {
      img: "../src/images/heroimg3.png",
      name: "Working",
      author: "Author",
      rating: "5.0",
      star: "../src/images/star.jpg",
      category: "Category",
      bookTitle: "Book Title",
    },
    {
      img: "../src/images/heroimg4.png",
      name: "Working",
      author: "Author",
      rating: "5.0",
      star: "../src/images/star.jpg",
      category: "Category",
      bookTitle: "Book Title",
    },
  ];

  return (
    <>
      <Hero />
      <div className="cards">
        {cardsData.map((card, index) => (
          <Card
            key={index}
            img={card.img}
            name={card.name}
            author={card.author}
            rating={card.rating}
            star={card.star}
            category={card.category}
            bookTitle={card.bookTitle}
          />
        ))}
      </div>
    </>
  );
}
function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Book />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
