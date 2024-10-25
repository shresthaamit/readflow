import React from "react";
import { useParams } from "react-router-dom";
export default function BookDetails() {
  const { id } = useParams();
  return (
    <div>
      <h2>Book Details</h2>
      <p>This is a sample book.</p>
      <p>Book ID: {id}</p>
    </div>
  );
}
