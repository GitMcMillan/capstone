import { createContext, useEffect, useState } from "react";

export const BookstoreContext = createContext();

export const BookstoreProvider = ({ children }) => {
  const [bookstoreData, setBookstoreData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/bookstores")
      .then((r) => r.json())
      .then((data) => setBookstoreData(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <BookstoreContext.Provider value={{ bookstoreData, setBookstoreData }}>
      {children}
    </BookstoreContext.Provider>
  );
};
