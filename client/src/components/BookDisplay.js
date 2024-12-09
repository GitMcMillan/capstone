import React from "react";

const BookDisplay = ({ book }) => {
  return (
    <li className="bg-gray-100 shadow-md rounded-md p-4 mb-4">
      <p className="text-lg font-bold">Title: {book.title}</p>
      <p className="text-sm text-gray-600">Author: {book.author}</p>
      <p className="text-sm text-gray-600">Pages: {book.page_number}</p>
    </li>
  );
};

export default BookDisplay;
