import React, { useState, useEffect } from "react";
import axios from "axios";
import "./profile.css"; // Use your existing profile.css

const EditBook = ({ bookId, onBack, onBookUpdated, onBookDeleted }) => {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    author: "",
    category: "", // Category id will be stored here
    image: null,
    pdf: null,
    publisher: null, // Set to null initially
    publication_date: "", // Set to empty initially
    distribution_expenses: "", // Add field for distribution_expenses if needed
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch categories and book data for editing
  useEffect(() => {
    const fetchCategoriesAndBook = async () => {
      try {
        const [categoryResponse, bookResponse] = await Promise.all([
          axios.get("http://127.0.0.1:8000/category/"),
          axios.get(`http://127.0.0.1:8000/books/accounts/${bookId}/`, {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }),
        ]);

        if (Array.isArray(categoryResponse.data.results)) {
          const categoriesData = categoryResponse.data.results.map(
            (category) => ({
              id: category.id,
              name: category.name,
            })
          );
          setCategories(categoriesData);
        }

        const book = bookResponse.data;
        setFormData({
          title: book.title,
          subtitle: book.subtitle,
          author: book.author,
          category: book.category.id, // Assuming category is an object
          image: null, // Image handling can be complex, so handle it carefully if needed
          pdf: null,
          publisher: book.publisher,
          publication_date: book.publication_date,
          distribution_expenses: book.distribution_expenses || "",
        });
        setSelectedCategory(book.category.id); // Set the selected category
      } catch (err) {
        setError("Failed to load data.");
        console.error(err);
      }
    };

    fetchCategoriesAndBook();
  }, [bookId]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setFormData({ ...formData, category: e.target.value });
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
      publisher: null,
      publication_date: "",
      distribution_expenses: "", // Reset distribution_expenses
    });
    setSuccessMessage("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedDate = new Date(formData.publication_date)
      .toISOString()
      .split("T")[0];

    if (isNaN(new Date(formData.publication_date))) {
      setError("Invalid publication date format. Use YYYY-MM-DD.");
      return;
    }

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
    data.append("publication_date", formattedDate);

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/books/accounts/${bookId}/`,
        data,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccessMessage("Book updated successfully!");
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
      if (onBookUpdated) onBookUpdated(response.data);
    } catch (err) {
      setError("Failed to update book. Please try again later.");
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
        value={formData.publication_date}
        onChange={handleChange}
        required
      />
      <label>Distribution Expenses:</label>
      <input
        type="text"
        name="distribution_expenses"
        value={formData.distribution_expenses}
        onChange={handleChange}
        placeholder="Enter distribution expenses (Optional)"
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
        Update Book
      </button>
      <button type="button" className="cancel" onClick={handleCancel}>
        Cancel
      </button>
      <button type="button" className="delete" onClick={handleDelete}>
        Delete Book
      </button>
      <button type="button" className="back" onClick={onBack}>
        Back to Book List
      </button>
    </form>
  );
};

export default EditBook;
