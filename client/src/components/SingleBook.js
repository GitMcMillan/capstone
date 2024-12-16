import React, { useContext, useState, useEffect } from "react";
import { BookContext } from "./Helper/BookContext";
import { useParams, useHistory } from "react-router-dom";

const SingleBook = () => {
  const { id } = useParams();
  const history = useHistory();
  const {
    fetchBookById,
    bookById,
    handleDelete,
    message,
    resetMessage,
    fetchBookData,
  } = useContext(BookContext);

  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [pages, setPages] = useState("");
  const [bookstore, setBooktore] = useState("");
  const [author, setAuthor] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    resetMessage();
    fetchBookById(id);

    return () => resetMessage();
  }, [id, fetchBookById, resetMessage]);

  const handleDeleteClick = () => {
    handleDelete(id);
    fetchBookData();
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
      history.push("/books");
    }, 2000);
  };

  if (!bookById) {
    return <p>Loading book details...</p>;
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };

  const handlePagesChange = (e) => {
    setPages(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };

  const handleBookstoreChange = (e) => {
    setBooktore(e.target.value);
  };

  const closeModal = () => setShowModal(false);

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
      {message && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-black p-4 rounded">
            <p>{message}</p>
          </div>
        </div>
      )}
      <form>
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={handleTitleChange}
        />
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
        <button type="button" onClick={handleDeleteClick}>
          Delete Book
        </button>
      </form>

      {/* MOdal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 items-center justify-center"
          onClick={closeModal}
        >
          <div
            className="bg-white text-black p-6 rounded shadow-lg"
            onClick={(e) => e.stopPropogation()}
          >
            <p className="text-lg font-bold">Book Deleted! </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleBook;
