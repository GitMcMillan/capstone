import React, { useContext } from "react";
import { BookContext } from "./Helper/BookContext";

const BookDisplay = () => {
  const { bookData } = useContext(BookContext);

  return (
    <div>
      <h1>Book Data</h1>
      <ul>
        {bookData.length > 0 ? (
          bookData.map((item, index) => (
            <li
              key={index}
              className="bg-gray-100 shadow-md rounded-md p-4 mb-4"
            >
              <p className="text-lg font-bold">Title: {item.title}</p>
              <p className="text-sm text-gray-600">Author: {item.author}</p>
              <p className="text-sm text-gray-600">Pages: {item.page_number}</p>
            </li>
          ))
        ) : (
          <p>data not showing</p>
        )}
      </ul>
    </div>
  );
};

export default BookDisplay;
