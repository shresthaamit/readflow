import React, { useState, useEffect } from "react";
import axios from "axios";
import "./profile.css"; // Use your existing profile.css

const AddBook = ({ onBack, onBookAdded }) => {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    author: "",
    category: "", // Category id will be stored here
    image: null,
    pdf: null,
    publisher: null, // Set to null initially
    publication_date: null, // Set to null initially
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [categories, setCategories] = useState([]); // Correctly named state
  const [selectedCategory, setSelectedCategory] = useState(""); // Keeping selected category in state

  useEffect(() => {
    // Fetch categories from your API for the category dropdown
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/category/");

        // Ensure the response is an array
        if (Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          setError("Invalid data format for categories.");
        }
      } catch (err) {
        setError("Failed to load categories.");
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value); // Update selected category
    setFormData({ ...formData, category: e.target.value }); // Update formData as well
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };

  const handleCancel = () => {
    setFormData({
      title: "",
      subtitle: "",
      author: "",
      category: "",
      image: null,
      pdf: null,
      publisher: null, // Reset publisher to null
      publication_date: null, // Reset publication_date to null
    });
    setSuccessMessage(""); // Clear any success message
    setError(""); // Clear any error message
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    if (formData.image instanceof File) {
      data.append("image", formData.image);
    }
    if (formData.pdf instanceof File) {
      data.append("pdf", formData.pdf);
    }

    // Append form data to the FormData object (including publisher and publication_date with null)
    Object.keys(formData).forEach((key) => {
      if (key !== "image" && key !== "pdf" && formData[key] !== "") {
        data.append(key, formData[key] !== null ? formData[key] : null);
      }
    });

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/books/", // Assuming the endpoint to create a new book is a POST request to /books/
        data,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccessMessage("Book added successfully!");
      setFormData({
        title: "",
        subtitle: "",
        author: "",
        category: "",
        image: null,
        pdf: null,
        publisher: null, // Reset publisher to null
        publication_date: null, // Reset publication_date to null
      }); // Reset the form after success
      if (onBookAdded) onBookAdded(response.data); // Pass the new book data to the parent component

      // Log success message to console
      console.log("Book successfully uploaded:", response.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Unauthorized. Please log in again.");
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else {
        setError("Failed to add book. Please try again later.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="edit-profile">
      <label>Title:</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <label>Subtitle:</label>
      <input
        type="text"
        name="subtitle"
        value={formData.subtitle}
        onChange={handleChange}
        required
      />
      <label>Author:</label>
      <input
        type="text"
        name="author"
        value={formData.author}
        onChange={handleChange}
        required
      />
      <label>Category:</label>
      <select
        name="category"
        value={selectedCategory}
        onChange={handleCategoryChange}
        required
      >
        <option value="">Select Category</option>
        {Array.isArray(categories) && categories.length > 0 ? (
          categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))
        ) : (
          <option value="">No categories available</option>
        )}
      </select>
      <label>Book Image (Optional):</label>
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleFileChange}
      />
      <label>PDF File (Optional):</label>
      <input
        type="file"
        name="pdf"
        accept="application/pdf"
        onChange={handleFileChange}
      />

      {formData.image && (
        <div className="preview">
          <p>Image Preview:</p>
          <img
            src={URL.createObjectURL(formData.image)}
            alt="Book Preview"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        </div>
      )}

      {formData.pdf && (
        <div className="preview">
          <p>PDF Preview:</p>
          <a
            href={URL.createObjectURL(formData.pdf)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open PDF
          </a>
        </div>
      )}

      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <button type="submit" className="update">
        Add Book
      </button>
      <button type="button" className="cancel" onClick={handleCancel}>
        Cancel
      </button>
      <button type="button" className="back" onClick={onBack}>
        Back to Book List
      </button>
    </form>
  );
};

export default AddBook;
