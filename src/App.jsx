import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import { Component } from "react";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Card from "./components/card";
import Footer from "./components/footer";
import "../src/components/card.css";
function App() {
  const [cardIndex, setCardIndex] = useState(0);
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

  const infiniteCards = [...cardsData, ...cardsData]; // Duplicate cards for seamless flow

  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTranslateX((prevTranslateX) => {
        if (prevTranslateX <= -cardsData.length * 262) {
          return 0; // Reset position if it goes out of bounds
        }
        return prevTranslateX - 262; // Move left by the width of a card
      });
    }, 2000); // Move every 2 seconds

    return () => clearInterval(interval);
  }, [cardsData.length]);

  return (
    <div>
      <Navbar />
      <Hero />
      {/* <> */}
      <div
        className="cards"
        style={{ transform: `translateX(-${cardIndex * 262}px)` }}
      >
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
      <Footer />
    </div>
  );
}

export default App;
