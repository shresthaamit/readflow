import React from "react";
import "./ButtonGroup.css";
export default function ButtonGroup({
  onSubmit,
  onCancel,
  submitLabel = "Submit",
  cancelLabel = "Cancel",
  className = "buttonGroup",
}) {
  return (
    <>
      <div className="buttomgroup">
        <button onClick={onSubmit} className="submit-button">
          {submitLabel}
        </button>
        <button onClick={onCancel} className="cancel-button">
          {cancelLabel}
        </button>
      </div>
    </>
  );
}
