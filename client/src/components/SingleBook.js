import React, { useContext, useState, useEffect } from "react";
import { BookContext } from "./Helper/BookContext";
import { useParams, useHistory } from "react-router-dom";
import { UserContext } from "./Helper/Context";

const SingleBook = () => {
  const { id } = useParams();
  const history = useHistory();
  const { user } = useContext(UserContext);

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
  const [author, setAuthor] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    resetMessage();
    fetchBookById(id);
    if (bookById) {
      setTitle("");
      setGenre("");
      setPages("");
      setAuthor("");
    }
    return () => resetMessage();
  }, [id, fetchBookById, resetMessage, bookById]);

  const handleDeleteClick = () => {
    handleDelete(id);
    fetchBookData();
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
      history.push("/books");
    }, 2000);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedBook = {
      ...(title && { title }),
      ...(genre && { genre }),
      ...(pages !== "" && { page_number: parseInt(pages, 10) }),
      ...(author && { author }),
    };

    fetch(`http://127.0.0.1:5555/books/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBook),
    })
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else {
          throw new Error("Failed to update the book");
        }
      })
      .then((updatedBookData) => {
        console.log("Updated Book:", updatedBookData);
        fetchBookById(id);
        fetchBookData();
      })
      .catch((error) => {
        console.error("Error updating book:", error);
      });
  };

  const closeModal = () => setShowModal(false);

  if (!user) {
    return (
      <div className="text-center p-4">
        <h2 className="text-xl font-bold text-red-600">
          You are not logged in
        </h2>
        <p className="text-gray-600">
          Please click <span className="font-bold">Log In</span> above.
        </p>
      </div>
    );
  }

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
      <form onSubmit={handleEditSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block mb-2 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="block mb-2 p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Pages"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
          className="block mb-2 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="block mb-2 p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={handleDeleteClick}
          className="bg-red-500 text-white px-4 py-2 rounded mt-2 ml-2"
        >
          Delete Book
        </button>
      </form>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={closeModal}
        >
          <div
            className="bg-white text-black p-6 rounded shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-lg font-bold">Book Deleted! </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleBook;
