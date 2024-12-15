import React, { useContext, useState, useEffect } from "react";
import { BookContext } from "./Helper/BookContext";
import { useParams } from "react-router-dom";

const SingleBook = () => {
  const { id } = useParams();
  const { fetchBookById, bookById, handleDelete, message, setMessage } =
    useContext(BookContext);
  // console.log("Book details:", bookById);
  // console.log("Fetched ID:", id);

  const [genre, setGenre] = useState([]);
  const [pages, setPages] = useState([]);
  const [bookstore, setBooktore] = useState([]);
  const [author, setAuthor] = useState([]);

  useEffect(() => {
    if (bookById === null) {
      setMessage("Book has been deleted.");
      return;
    }
    fetchBookById(id);
  }, [id, fetchBookById, bookById, setMessage]);

  if (message) {
    return <p>{message}</p>;
  }

  if (!bookById) {
    return <p>Loading book details...</p>;
  }

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
    console.log(genre);
  };

  const handlePagesChange = (e) => {
    setPages(e.target.value);
    console.log(pages);
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
    console.log(author);
  };

  const handleBookstoreChange = (e) => {
    setBooktore(e.target.value);
    console.log(bookstore);
  };

  return (
    <div className="bg-gray-100 shadow-md rounded-md p-4 mb-4">
      <h1 className="text-lg font-bold">{bookById.title}</h1>
      <p className="text-sm text-gray-600">Genre: {bookById.genre}</p>
      <p className="text-sm text-gray-600">Pages: {bookById.page_number}</p>
      <p className="text-sm text-gray-600">
        Author: {bookById.author?.name || "Unknown Author"}
      </p>
      <p className="text-sm text-gray-600">
        Bookstore: {bookById.bookstore?.name || "Unknown Bookstore"}
      </p>
      {message && <p>{message}</p>}
      <form>
        <input
          type="text"
          placeholder="genre"
          value={genre}
          onChange={handleGenreChange}
        />
        <input
          type="text"
          placeholder="pages"
          value={pages}
          onChange={handlePagesChange}
        />
        <input
          type="text"
          placeholder="author"
          value={author}
          onChange={handleAuthorChange}
        />
        <input
          type="text"
          placeholder="bookstore"
          value={bookstore}
          onChange={handleBookstoreChange}
        />
        <button type="button" onClick={() => handleDelete(id)}>
          Delete Book
        </button>
      </form>
    </div>
  );
};

export default SingleBook;
