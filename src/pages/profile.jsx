import Card from "../components/card";
import EditProfile from "./editProfile";
import "./profile.css";
import user from "../images/heroimg4.png";
import { useState, useEffect } from "react";
import axios from "axios";
import defaults from "../images/default.png";
import { useNavigate } from "react-router-dom";
import AddBook from "./addbooks"; // Import AddBook component

export default function Profile() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("history"); // Initially shows history
  const [activeTab, setActiveTab] = useState("downloads");
  const [userInfo, setUserInfo] = useState(null);
  const [favouriteBooks, setFavouriteBooks] = useState([]);
  const [downloadedBooks, setDownloadedBooks] = useState([]); // Added for downloaded books
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingBookId, setLoadingBookId] = useState(null);

  // Calculate total books (favourite + downloaded)
  const totalBooks = favouriteBooks.length + downloadedBooks.length;

  // Calculate downloaded and favourite books counts
  const downloadedBooksCount = downloadedBooks.length; // Downloaded count
  const favouriteBooksCount = favouriteBooks.length; // Favourite count

  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve token
    if (token) {
      axios
        .get("http://127.0.0.1:8000/accounts/checkstatus/", {
          headers: { Authorization: `Token ${token}` },
        })
        .then((response) => {
          setUserInfo(response.data.detail);
          console.log("User Info:", response.data.detail); // Debug logging
          fetchFavoriteBooks();
          fetchDownloadedBooks(); // Fetch downloaded books as well
        })
        .catch(() => {
          setUserInfo(null); // If error, set to null (anonymous user)
          setError("Failed to fetch user details. Please try again.");
        })
        .finally(() => setIsLoading(false)); // Stop loading
    } else {
      setUserInfo(null);
      setIsLoading(false);
    }
  }, []);

  const fetchFavoriteBooks = () => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://127.0.0.1:8000/books/favourites/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((response) => {
          const favBooks = response.data.results;
          console.log("Favorite Books:", favBooks); // Debug logging
          setFavouriteBooks(favBooks); // Set the favorite books in the state
        })
        .catch(() => {
          setError("Failed to fetch favorite books.");
        });
    }
  };

  const fetchDownloadedBooks = () => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://127.0.0.1:8000/books/downloads/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((response) => {
          const downloadedBooksList = response.data.results;
          console.log("Downloaded Books:", downloadedBooksList); // Debug logging
          setDownloadedBooks(downloadedBooksList); // Set downloaded books in the state
        })
        .catch(() => {
          setError("Failed to fetch downloaded books.");
        });
    }
  };

  const removeFromFavorites = (bookId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to be logged in to remove from favorites.");
      return;
    }
    setLoadingBookId(bookId);
    axios
      .delete(`http://127.0.0.1:8000/books/${bookId}/removefavorite/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then(() => {
        setFavouriteBooks((prevBooks) =>
          prevBooks.filter((book) => book.id !== bookId)
        );
      })
      .catch((error) => {
        console.error("Error removing from favorites:", error);
        setError("Failed to remove book from favorites.");
      })
      .finally(() => {
        setLoadingBookId(null); // Reset the loading state
      });
  };

  const imageUrl = userInfo?.profile_picture
    ? `http://127.0.0.1:8000${userInfo.profile_picture}` // Construct the full URL
    : defaults;

  // Handle the click on "Add Books"
  const handleAddBook = () => {
    setActiveSection("addbook"); // Switch to the "addbook" section
  };

  return (
    <>
      <div className="profilehead">
        <h1>My Profile</h1>
        <p>
          Your personal space on Readflow in the "My Profile Section". View your
          favourite books, downloaded books, and manage account preferences.
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
            <div className="buton">
              <button
                className="profilebtn"
                onClick={() => setActiveSection("edit")}
              >
                Edit Profile
              </button>
              {userInfo?.usertype && ( // Check if the user is a staff member
                <button className="profilebtn" onClick={handleAddBook}>
                  Add Books
                </button>
              )}
              {userInfo?.usertype && ( // Check if the user is a staff member
                <button className="profilebtn" onClick={handleAddBook}>
                  View Books
                </button>
              )}
            </div>
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
              {activeTab === "favourites" ? (
                favouriteBooks.length > 0 ? (
                  favouriteBooks.map((books) => (
                    <Card
                      key={books.id}
                      book={books.book_detail}
                      isProfilePage={true} // New prop to indicate it's the profile page
                      removeFromFavorites={removeFromFavorites}
                    />
                  ))
                ) : (
                  <p>No favourite books yet!</p>
                )
              ) : null}

              {activeTab === "downloads" ? (
                downloadedBooks.length > 0 ? (
                  downloadedBooks.map((book) => (
                    <Card key={book.id} book={book} />
                  ))
                ) : (
                  <p>No downloaded books yet!</p>
                )
              ) : null}
            </div>
          </div>
        ) : activeSection === "addbook" ? (
          <AddBook onBack={() => setActiveSection("history")} /> // Render AddBook when activeSection is "addbook"
        ) : (
          <EditProfile onBack={() => setActiveSection("history")} />
        )}
      </div>
    </>
  );
}
