import axios from "axios";

const handleDownloadBook = async (bookId) => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("You must be logged in to download this book.");
    return;
  }

  if (!bookId) {
    console.error("Invalid book ID");
    alert("Invalid book ID.");
    return;
  }

  try {
    console.log(`Attempting to download book with ID: ${bookId}`); // Log the bookId

    // Call the backend API to download the book
    const response = await axios.get(
      `http://127.0.0.1:8000/books/${bookId}/download`, // Ensure bookId is correctly used
      {
        headers: {
          Authorization: `Token ${token}`,
        },
        responseType: "blob", // Expecting the response as a PDF blob
      }
    );

    // Create a temporary URL for the file to trigger the download
    const fileURL = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = fileURL;
    link.setAttribute("download", `book-${bookId}.pdf`); // File name for download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Clean up the link element

    alert("Download started!");
  } catch (error) {
    console.error("Download error:", error);
    alert("No PDF found for this book");
  }
};

export default handleDownloadBook;
