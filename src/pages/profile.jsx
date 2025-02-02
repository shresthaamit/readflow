import Card from "../components/card";
import RecommendBooks from "../components/recommended";
import books from "./books.json";
import EditProfile from "./editProfile";
import "./profile.css";
import user from "../images/heroimg4.png";
import { useState, useEffect } from "react";
import axios from "axios";
import defaults from "../images/default.png";
export default function Profile() {
  const [activeSection, setActiveSection] = useState("history");
  const [activeTab, setActiveTab] = useState("downloads");
  const [userInfo, setUserInfo] = useState(null);
  console.log(userInfo);
  console.log("error");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
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
  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve token
    if (token) {
      axios
        .get("http://127.0.0.1:8000/accounts/checkstatus/", {
          headers: { Authorization: `Token ${token}` },
        })
        .then((response) => {
          setUserInfo(response.data.detail); // Update user info
        })
        .catch((error) => {
          setUserInfo(null); // If error, set to null (anonymous user)
          setError("Failed to fetch user details. Please try again.");
        })
        .finally(() => setIsLoading(false)); // Stop loading
    } else {
      setUserInfo(null);
      setIsLoading(false);
    }
  }, []);
  const imageUrl = userInfo?.profile_picture
    ? `http://127.0.0.1:8000${userInfo.profile_picture}` // Construct the full URL
    : defaults;

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
            <img src={imageUrl} alt="Profile Pic" />
            {isLoading ? (
              <p>Loading...</p>
            ) : userInfo ? (
              <>
                <h2>{userInfo.username}</h2>
                <p>User since: {userInfo.date_joined}</p>
              </>
            ) : (
              <>
                <h2>Anonymous User</h2>
                <p>Please log in to see your profile details.</p>
              </>
            )}
            <button onClick={() => setActiveSection("edit")}>
              Edit Profile
            </button>
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
        {activeSection === "history" ? (
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
        ) : (
          <EditProfile onBack={() => setActiveSection("history")} />
        )}
      </div>
      {/* </div> */}
    </>
  );
}
