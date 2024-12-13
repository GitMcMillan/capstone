import { createContext, useEffect, useState } from "react";

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [bookData, setBookData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/books")
      .then((r) => r.json())
      .then((data) => setBookData(data))
      .catch((error) => console.error("Error:", error));
  }, []);
  console.log(bookData);

  return (
    <BookContext.Provider value={{ bookData, setBookData }}>
      {children}
    </BookContext.Provider>
  );
};
