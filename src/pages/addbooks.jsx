import React, { useState, useEffect } from "react";
import axios from "axios";
import "./profile.css"; // Use your existing profile.css
import { use } from "react";
import { useFetcher } from "react-router-dom";

const AddBook = ({ onBack, onBookAdded, bookToEdit }) => {
  const [formData, setFormData] = useState(null);

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/category/");
        console.log("Categories fetched:", response.data); // Log the response from the API to check the data
        if (Array.isArray(response.data.results)) {
          const categoriesData = response.data.results.map((category) => ({
            id: category.id,
            name: category.name,
          }));
          setCategories(categoriesData);
        } else {
          setError("Invalid data format for categories.");
        }
      } catch (err) {
        setError("Failed to load categories.");
        console.error("Error fetching categories:", err); // Log error if fetching categories fails
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    setFormData({
      title: bookToEdit?.title || "",
      subtitle: bookToEdit?.subtitle || "",
      author: bookToEdit?.author || "",
      category: bookToEdit?.category || "", // Category id will be stored here
      image: "",
      pdf: "",
      publisher: bookToEdit?.publisher || "", // Set to null initially
      publication_date: bookToEdit?.publication_date || "", // Set to empty initially
      distribution_expenses: bookToEdit?.distribution_expenses || "", // Add field for distribution_expenses if needed
    });
  }, [bookToEdit]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setFormData({ ...formData, category: e.target.value });
    console.log("Selected category:", e.target.value); // Log the selected category value
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log("Form data updated:", formData); // Log the updated form data
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
    console.log(`${name} file updated:`, files[0]); // Log the file selected
  };

  const handleCancel = () => {
    setFormData({
      title: "",
      subtitle: "",
      author: "",
      category: "",
      image: null,
      pdf: null,
      publisher: null,
      publication_date: "",
      distribution_expenses: "", // Reset distribution_expenses
    });
    setSuccessMessage("");
    setError("");
    console.log("Form reset"); // Log when form is reset
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure publication_date is in the correct format (YYYY-MM-DD)
    const formattedDate = new Date(formData.publication_date)
      .toISOString()
      .split("T")[0];
    if (isNaN(new Date(formData.publication_date))) {
      setError("Invalid publication date format. Use YYYY-MM-DD.");
      console.log("Invalid publication date:", formData.publication_date); // Log invalid date format
      return;
    }

    console.log("Submitting form with data:", formData); // Log the form data before submitting

    const data = new FormData();
    if (formData.image instanceof File) {
      data.append("image", formData.image);
    }
    if (formData.pdf instanceof File) {
      data.append("pdf", formData.pdf);
    }

    Object.keys(formData).forEach((key) => {
      if (key !== "image" && key !== "pdf" && formData[key] !== "") {
        data.append(key, formData[key] !== null ? formData[key] : null);
      }
    });
    // Add the formatted date
    data.append("publication_date", formattedDate);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/books/accounts/",
        data,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Book added successfully:", response.data); // Log the successful response from the API
      setSuccessMessage("Book added successfully!");
      setFormData({
        title: "",
        subtitle: "",
        author: "",
        category: "",
        image: null,
        pdf: null,
        publisher: null,
        publication_date: "",
        distribution_expenses: "", // Reset distribution_expenses
      });
      if (onBookAdded) onBookAdded(response.data);
    } catch (err) {
      console.error("Error response:", err.response); // Log the error response if the request fails
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
        value={formData?.title}
        onChange={handleChange}
        required
      />
      <label>Subtitle:</label>
      <input
        type="text"
        name="subtitle"
        value={formData?.subtitle}
        onChange={handleChange}
        required
      />
      <label>Author:</label>
      <input
        type="text"
        name="author"
        value={formData?.author}
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
        {categories.length > 0 ? (
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
      <label>Publication Date (Required):</label>
      <input
        type="date"
        name="publication_date"
        value={formData?.publication_date}
        onChange={handleChange}
        required
      />
      <label>Distribution Expenses:</label>
      <input
        type="text"
        name="distribution_expenses"
        value={formData?.distribution_expenses}
        onChange={handleChange}
        placeholder="Enter distribution expenses (Optional)"
      />

      {formData?.image && (
        <div className="preview">
          <p>Image Preview:</p>
          <img
            src={URL.createObjectURL(formData?.image)}
            alt="Book Preview"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        </div>
      )}

      {formData?.pdf && (
        <div className="preview">
          <p>PDF Preview:</p>
          <a
            href={URL.createObjectURL(formData?.pdf)}
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
