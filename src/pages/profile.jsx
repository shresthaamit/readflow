import Card from "../components/card";
import EditProfile from "./editProfile";
import "./profile.css";
import user from "../images/heroimg4.png";
import { useState, useEffect } from "react";
import axios from "axios";
import defaults from "../images/default.png";
import { useNavigate, useLocation } from "react-router-dom";
import AddBook from "./addbooks"; // Import AddBook component
import StaffBooks from "./viewbook"; // Import StaffBooks component
import DownloadCard from "../components/DownloadCard";
export default function Profile() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("history"); // Initially shows history
  const [activeTab, setActiveTab] = useState("downloads");
  const [userInfo, setUserInfo] = useState(null);
  const [favouriteBooks, setFavouriteBooks] = useState([]);
  const [downloadedBooks, setDownloadedBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingBookId, setLoadingBookId] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [editBookId, setEditBookId] = useState(null); // Get book ID for editing
  const [bookToEdit, setBookToEdit] = useState(null);

  // Fetch the book details for editing if editBookId is present
  useEffect(() => {
    if (editBookId) {
      axios
        .get(`http://127.0.0.1:8000/books/accounts/${editBookId}/`, {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setBookToEdit(response.data); // Set the book data for editing
        })
        .catch((err) => {
          console.error("Error fetching book details:", err);
        });
    }
  }, [editBookId]);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve token
    if (token) {
      axios
        .get("http://127.0.0.1:8000/accounts/checkstatus/", {
          headers: { Authorization: `Token ${token}` },
        })
        .then((response) => {
          setUserInfo(response.data.detail);
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
        .get("http://127.0.0.1:8000/books/user/downloaded-books/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((response) => {
          console.log("Downloaded Books Response:", response.data);
          setDownloadedBooks(response.data || []); // Ensure it's always an array
        })
        .catch(() => {
          setError("Failed to fetch downloaded books.");
          setDownloadedBooks([]); // Set as empty array on error
        });
    }
  };
  const removeFromDownloads = async (book_id) => {
    const token = localStorage.getItem("token"); // Get the token

    if (!token) {
      console.error("User is not authenticated.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/books/user/downloads/delete/${book_id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (response.ok) {
        // Successfully removed the book from downloads, update the state
        setDownloadedBooks((prevBooks) =>
          prevBooks.filter((book) => book.book_id !== book_id)
        );
      } else {
        console.error("Failed to remove the book from downloads.");
      }
    } catch (err) {
      console.error("Error occurred while removing the book:", err);
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
    setBookToEdit(null);
    setActiveSection("addbook"); // Switch to the "addbook" section
  };

  const handleViewBooks = () => {
    setActiveSection("viewbooks"); // Switch to "viewbooks" section (StaffBooks)
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
                <p>Since: {userInfo.date_joined}</p>
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
              {userInfo?.usertype && (
                <>
                  <button className="profilebtn" onClick={handleAddBook}>
                    Add Books
                  </button>
                  <button className="profilebtn" onClick={handleViewBooks}>
                    View Books
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="profileright">
            <div className="profile-stats">
              <div className="stat">
                <p>Total Books</p>
                <p>{favouriteBooks.length + downloadedBooks.length}</p>
              </div>
              <div className="stat">
                <p>Downloaded Books</p>
                <p>{downloadedBooks.length}</p>
              </div>
              <div className="stat">
                <p>Favourite Books</p>
                <p>{favouriteBooks.length}</p>
              </div>
            </div>
          </div>
        </div>

        {activeSection === "history" && (
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
                    <DownloadCard
                      key={book.book_id}
                      book={book}
                      isProfilePage={true}
                      removeFromDownloads={removeFromDownloads}
                    />
                  ))
                ) : (
                  <p>No downloaded books yet!</p>
                )
              ) : null}
            </div>
          </div>
        )}

        {activeSection === "addbook" && (
          <AddBook
            // Pass the book data if it's in edit mode
            onBack={() => setActiveSection("history")}
            bookToEdit={bookToEdit ? bookToEdit : null}
          />
        )}

        {activeSection === "edit" && (
          <EditProfile onBack={() => setActiveSection("history")} />
        )}

        {activeSection === "viewbooks" && (
          <StaffBooks
            changeActive={setActiveSection}
            setEditId={setEditBookId}
          />
        )}
      </div>
    </>
  );
}
