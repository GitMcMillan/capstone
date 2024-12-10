import React, { useContext } from "react";
import { LibraryContext } from "./Helper/LibraryContext";

const LibraryDisplay = () => {
  const { libraryData } = useContext(LibraryContext);

  return (
    <div>
      <h1>User Data</h1>
      <ul>
        {libraryData.length > 0 ? (
          libraryData.map((item, index) => (
            <li
              key={index}
              className="bg-gray-100 shadow-md rounded-md p-4 mb-4"
            >
              <p className="text-lg font-bold">User: {item.user_id}</p>
              <p className="text-sm text-gray-600">Books: {item.book_id}</p>
            </li>
          ))
        ) : (
          <p>data not showing</p>
        )}
      </ul>
    </div>
  );
};

export default LibraryDisplay;
