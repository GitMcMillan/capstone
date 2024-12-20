// erase
import { createContext, useEffect, useState } from "react";

export const BookstoreContext = createContext();

export const BookstoreProvider = ({ children }) => {
  const [bookstoreData, setBookstoreData] = useState([]);

  useEffect(() => {
    fetch("/bookstores")
      .then((r) => r.json())
      .then((data) => setBookstoreData(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleAddBookstore = (newBookstore) => {
    fetch("/bookstores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBookstore),
    })
      .then((response) => response.json())
      .then((addedBookstore) => {
        setBookstoreData((prev) => [...prev, addedBookstore]);
      })
      .catch((error) => console.error("Error adding bookstore:", error));
  };

  return (
    <BookstoreContext.Provider
      value={{ bookstoreData, setBookstoreData, handleAddBookstore }}
    >
      {children}
    </BookstoreContext.Provider>
  );
};
