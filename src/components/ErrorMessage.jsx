// ErrorMessage.jsx
import React from "react";

// The ErrorMessage component definition
const ErrorMessage = ({ message }) => {
  if (!message) return null; // Don't display anything if message is empty

  return (
    <div className="error">
      <p>{message}</p>
    </div>
  );
};

// Export the component for use in other files
export default ErrorMessage;
