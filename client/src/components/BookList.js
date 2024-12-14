import React, { useContext } from "react";
import { BookContext } from "./Helper/BookContext";
import { Link } from "react-router-dom";

const BookDisplay = () => {
  const { bookData } = useContext(BookContext);

  return (
    <div>
      <h1>Book Data</h1>
      <ul>
        {bookData.length > 0 ? (
          bookData.map((item) => (
            <li
              key={item.id}
              className="bg-gray-100 shadow-md rounded-md p-4 mb-4"
            >
              <Link
                to={`/books/${item.id}`}
                className="text-blue-500 hover:underline"
              >
                <p className="text-lg font-bold">Title: {item.title}</p>
                <p className="text-sm text-gray-600">
                  Author: {item.author?.name || "Unknown"}
                </p>
                <p className="text-sm text-gray-600">Genre: {item.genre}</p>
                <p className="text-sm text-gray-600">
                  Pages: {item.page_number}
                </p>
                <p className="text-sm text-gray-600">
                  Bookstore: {item.bookstore?.name || "Unknown"}
                </p>
              </Link>
            </li>
          ))
        ) : (
          <p>Data not showing</p>
        )}
      </ul>
    </div>
  );
};

export default BookDisplay;
