import React from "react";
import { useNavigate } from "react-router-dom";
import "./pagination.css";

const Pagination = ({ currentPage, totalPages }) => {
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    // Prevent navigating to pages less than 1 or greater than totalPages
    if (page < 1 || page > totalPages) return;
    navigate(`/books?page=${page}`);
  };

  return (
    <div className="pagination-container">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      <span>
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
