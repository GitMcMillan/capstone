import React, { useContext } from "react";
import { LibraryContext } from "./Helper/LibraryContext";
import { UserContext } from "./Helper/Context";
import { BookContext } from "./Helper/BookContext";

const LibraryDisplay = () => {
  const { libraryData } = useContext(LibraryContext);
  const { userData } = useContext(UserContext);
  const { bookData } = useContext(BookContext);
  console.log(libraryData);
  console.log(userData);
  console.log(bookData);

  return (
    <div>
      <h1>Library Data</h1>
      <ul>
        {libraryData.length > 0 ? (
          libraryData.map((item) => {
            const user = userData.find((user) => user.id === item.user_id);
            const book = bookData.find((book) => book.id === item.book_id);

            return (
              <li
                key={item.id}
                className="bg-gray-100 shadow-md rounded-md p-4 mb-4"
              >
                <p className="text-lg font-bold">
                  User: {user?.username || "Unknown User"}
                </p>
                <p className="text-sm text-gray-600">
                  Book: {book?.title || "Unknown Book"}
                </p>
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
