import React from "react";
import book from "../images/Working.gif";
import star from "../images/star.jpg";
import "./card.css";
export default function Card(props) {
  return (
    <div className="cards">
      <div className="card">
        <img src={props.img} alt="Working" />
        <div className="carddetail">
          <img src={props.star} alt="ratestar" />
          <span>{props.rating}</span>
          <span className="span">(6) • </span>
          <span className="span">{props.category}</span>
        </div>
        <p>
          <span className="spanbold">{props.bookTitle}</span>
        </p>
        <p>By: {props.author}</p>
      </div>
    </div>
  );
}
