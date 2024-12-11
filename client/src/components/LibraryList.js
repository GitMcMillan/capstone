import React, { useContext } from "react";
import { LibraryContext } from "./Helper/LibraryContext";
import { UserContext } from "./Helper/Context";
import { BookContext } from "./Helper/BookContext";

const LibraryDisplay = () => {
  const { libraryData } = useContext(LibraryContext);
  const { userData } = useContext(UserContext);
  const { bookData } = useContext(BookContext);

  return (
    <div>
      <h1>Library Data</h1>
      <ul>
        {userData.length > 0 ? (
          userData.map((user) => {
            // find all books for the current user
            // filter by relationship id === user id
            //map by book id === item book_id relationship
            const user_books = libraryData
              .filter((item) => item.user_id === user.id)
              .map((item) => bookData.find((book) => book.id === item.book_id));

            return (
              <li
                key={user.id}
                className="bg-gray-100 shadow-md rounded-md p-4 mb-4"
              >
                <p className="text-lg font-bold">
                  User: {user.username || "Unknown User"}
                </p>
                <ul className="pl-4">
                  {user_books.length > 0 ? (
                    //map user_books and produce the li
                    user_books.map((book) => (
                      <li key={book.id} className="text-sm text-gray-600">
                        {book.title}
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

export default LibraryDisplay;
