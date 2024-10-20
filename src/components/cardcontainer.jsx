// import React, { useEffect, useState } from "react";
// import Card from "./card";

// export default function CardsContainer({ cardsData }) {
//   const [cardIndex, setCardIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCardIndex((prevIndex) => (prevIndex + 1) % cardsData.length);
//     }, 2000); // Change every 2 seconds

//     return () => clearInterval(interval);
//   }, [cardsData.length]);

//   return (
//     <div
//       className="cards"
//       style={{ transform: `translateX(-${cardIndex * 262}px)` }}
//     >
//       {cardsData.map((card, index) => (
//         <Card
//           key={index}
//           img={card.img}
//           name={card.name}
//           author={card.author}
//           rating={card.rating}
//           star={card.star}
//           category={card.category}
//           bookTitle={card.bookTitle}
//         />
//       ))}
//     </div>
//   );
// }
