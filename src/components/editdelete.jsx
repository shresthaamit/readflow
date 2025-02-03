import React from "react";
import "./editDelete.css";
const EditDelete = ({ onEdit, onDelete }) => {
  return (
    <div className="review-actions">
      {/* Edit Button */}
      <button className="edit-button" onClick={onEdit}>
        Edit
      </button>

      {/* Delete Button */}
      <button className="delete-button" onClick={onDelete}>
        Delete
      </button>
    </div>
  );
};

export default EditDelete;
