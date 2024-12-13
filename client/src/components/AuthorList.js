import React, { useContext } from "react";
import { AuthorContext } from "./Helper/AuthorContext";
import { BookContext } from "./Helper/BookContext";

const AuthorDisplay = () => {
  const { authorData } = useContext(AuthorContext);
  const { bookData } = useContext(BookContext);

  return (
    <div>
      <h1>Author Data</h1>
      <ul>
        {authorData.length > 0 ? (
          authorData.map((author) => {
            // Find all books written by the current author
            const authorBooks = bookData.filter(
              (book) => book.author_id === author.id
            );

            return (
              <li
                key={author.id}
                className="bg-gray-100 shadow-md rounded-md p-4 mb-4"
              >
                <p className="text-lg font-bold">
                  Author: {author.name || "Unknown Author"}
                </p>
                <ul className="pl-4">
                  {authorBooks.length > 0 ? (
                    authorBooks.map((book) => (
                      <li key={book.id} className="text-sm text-gray-600">
                        {book.title || "Untitled"}
                      </li>
                    ))
                  ) : (
                    <li className="text-sm text-gray-600">No Books</li>
                  )}
                </ul>
              </li>
            );
          })
        ) : (
          <p>Data not showing</p>
        )}
      </ul>
    </div>
  );
};

export default AuthorDisplay;
