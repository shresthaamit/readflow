import React from "react";
import { useParams, Link } from "react-router-dom";
import man from "../images/man1.jpg";
import books from "./books.json";
import { LuDownload } from "react-icons/lu";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import "./books.css";
// import QRCode from "qrcode.react";
import placeholderQR from "../images/qr.png";
export default function BookDetails() {
  const { id } = useParams();
  const book = books.find((b) => b.id === parseInt(id));
  if (!book) {
    return <p>No Book found</p>;
  }
  return (
    <div className="detailpage">
      {/* <h2>Book Details</h2> */}
      <div className="bookdetail">
        <div className="bookimg">
          <img src={book.img} alt={book.title} />
        </div>
        <div className="detail">
          <h1>"{book.bookTitle}"</h1>
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
              <textarea placeholder="Enter a review"></textarea>
              <div className="rating-submit">
                <select name="rating" className="rating-dropdown">
                  <option value="">Rate</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button type="button" className="action send-button">
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
      <div class="reviewdetailsection">
        <AllReview />
      </div>

      {/* <p>Book ID: {id}</p> */}
      {/* <p>Author: {book.author }</p> */}
    </div>
  );
}
function AllReview() {
  return (
    <div className="reviewdetailsection">
      <h1>Review of other readers</h1>
      <div className="review">
        <div className="userimg">
          <img src={man} alt="User Image" />
        </div>
        <div className="userdetail">
          <div className="namedate">
            <h4>User Name</h4>
            <span>2022-01-01</span>
          </div>
          <h3>Rating: 5/5</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            sagittis, metus eget ultricies scelerisque, velit velit fringilla
            libero, vel fringilla nisi nunc vel lectus.
          </p>
        </div>
      </div>
      {/* Add more review */}
    </div>
  );
}
