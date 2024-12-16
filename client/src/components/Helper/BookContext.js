import { createContext, useEffect, useState } from "react";

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [bookData, setBookData] = useState([]);
  const [bookById, setBookById] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5555/books")
      .then((r) => r.json())
      .then((data) => setBookData(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const fetchBookData = () => {
    fetch("http://127.0.0.1:5555/books")
      .then((r) => r.json())
      .then((data) => setBookData(data))
      .catch((error) => console.error("Error:", error));
  };

  const fetchBookById = (id) => {
    const bookid = bookData.find((book) => book.id === parseInt(id));
    if (bookid) {
      setBookById(bookid);
    } else {
      fetch(`http://127.0.0.1:5555/books/${id}`)
        .then((r) => {
          if (!r.ok) {
            throw new Error(`Book with ID ${id} not found`);
          }
          return r.json();
        })
        .then((book) => setBookById(book))
        .catch((error) => console.error("Error:", error));
    }
  };

  const handleDelete = (id) => {
    if (!id) {
      console.error("Book ID is missing.");
      return;
    }

    fetch(`http://127.0.0.1:5555/books/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Book successfully deleted.");
          setMessage("Book Deleted!");
          setBookById(null);
          fetchBookData();
          // Clear the message after 3 seconds
          setTimeout(() => setMessage(""), 3000);
        } else {
          console.error("Failed to delete the book.");
          setMessage("Failed to delete the book.");
        }
      })
      .catch(() => setMessage("Error deleting the book."));
  };

  const resetMessage = () => {
    console.log("Resetting message");
    setMessage("");
  };

  return (
    <BookContext.Provider
      value={{
        bookData,
        setBookData,
        fetchBookById,
        bookById,
        handleDelete,
        message,
        setMessage,
        resetMessage,
        fetchBookData,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
