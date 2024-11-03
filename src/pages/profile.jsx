import Card from "../components/card";
import RecommendBooks from "../components/recommended";
import books from "./books.json";
import "./profile.css";
import user from "../images/heroimg4.png";
export default function Profile() {
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
                <p>100</p>
              </div>
              <div className="stat">
                <p>Downloaded Books</p>
                <p>50</p>
              </div>
              <div className="stat">
                <p>Favourite Books</p>
                <p>30</p>
              </div>
            </div>
          </div>
        </div>
        <div className="profilehistory">
          <div className="profilenav">
            <ul>
              <li>
                <a href="#">Download History</a>
              </li>
              <li>
                <a href="#">Favourite History</a>
              </li>
            </ul>
          </div>
          <div className="navbooks">
            {books.map((book) => (
              <Card key={book.id} book={book} />
            ))}
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
