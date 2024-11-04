import Card from "../components/card";
import RecommendBooks from "../components/recommended";
import books from "./books.json";
import "./profile.css";
import user from "../images/heroimg4.png";
import { useState } from "react";
export default function Profile() {
  const [activeTab, setActiveTab] = useState("downloads");
  const totalBooks = books.length;
  const downloadedBooksCount = books.filter(
    (book) => book.historyType === "download"
  ).length;
  const favouriteBooksCount = books.filter(
    (book) => book.historyType === "favourite"
  ).length;
  const displayedBooks = books.filter((book) =>
    activeTab === "downloads"
      ? book.historyType === "download"
      : book.historyType === "favourite"
  );
  return (
    <>
      <div className="profilehead">
        <h1>My Profile</h1>
        <p>
          Your Personal space on Readflow in the "My Profile Section". View your
          favourite books and the downloaded and manage the account as
          prefrences
        </p>
      </div>
      <div className="accounts">
        <div className="profiles">
          <div className="profileleft">
            <img src={user} alt="Profile Pic" />
            <h2>John Doe</h2>
            <p>User since: 2022-01-01</p>
            <button>Edit Profile</button>
          </div>
          <div className="profileright">
            <div className="profile-stats">
              <div className="stat">
                <p>Total Books</p>
                <p>{totalBooks}</p>
              </div>
              <div className="stat">
                <p>Downloaded Books</p>
                <p>{downloadedBooksCount}</p>
              </div>
              <div className="stat">
                <p>Favourite Books</p>
                <p>{favouriteBooksCount}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="profilehistory">
          <div className="profilenav">
            <ul>
              <li key="download">
                <button
                  className={activeTab === "downloads" ? "active" : ""}
                  onClick={() => setActiveTab("downloads")}
                >
                  Download History
                </button>
              </li>
              <li key="favourite">
                <button
                  className={activeTab === "favourites" ? "active" : ""}
                  onClick={() => setActiveTab("favourites")}
                >
                  Favourite History
                </button>
              </li>
            </ul>
          </div>
          <div className="navbooks">
            {displayedBooks.map((book) => (
              <Card key={book.id} book={book} />
            ))}
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
