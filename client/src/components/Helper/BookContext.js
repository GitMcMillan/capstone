import { createContext, useEffect, useState } from "react";

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [bookData, setBookData] = useState([]);
  const [bookById, setBookById] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/books")
      .then((r) => r.json())
      .then((data) => setBookData(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const fetchBookById = (id) => {
    const bookid = bookData.find((book) => book.id === parseInt(id));
    if (bookid) {
      setBookById(bookid);
    } else {
      fetch(`http://127.0.0.1:5555/books/${id}`)
        .then((r) => r.json())
        .then((book) => setBookById(book))
        .catch((error) => console.error("Error:", error));
    }
  };

  return (
    <BookContext.Provider
      value={{ bookData, setBookData, fetchBookById, bookById }}
    >
      {children}
    </BookContext.Provider>
  );
};
