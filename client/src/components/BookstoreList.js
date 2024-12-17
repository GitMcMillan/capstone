import React, { useContext } from "react";
import { BookstoreContext } from "./Helper/BookstoreContext";

const BookstoreDisplay = () => {
  const { bookstoreData } = useContext(BookstoreContext);

  return (
    <div>
      <h1>Bookstores</h1>
      <ul>
        {bookstoreData.length > 0 ? (
          bookstoreData.map((store) => (
            <li
              key={store.id}
              className="bg-gray-100 shadow-md rounded-md p-4 mb-4"
            >
              <p className="text-blue-500 hover:underline">
                Name: {store.name}
              </p>
              <p className="text-sm text-gray-600">Address: {store.address}</p>
              <p className="text-sm text-gray-600">
                Phone Number: {store.phone_number}
              </p>
            </li>
          ))
        ) : (
          <p>Data not showing</p>
        )}
      </ul>
    </div>
  );
};

export default BookstoreDisplay;
