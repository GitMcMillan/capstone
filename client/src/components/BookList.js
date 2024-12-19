// erase
import React, { useContext, useState, useEffect } from "react";
import { BookContext } from "./Helper/BookContext";
import { UserContext } from "./Helper/Context";
import { Link } from "react-router-dom";
import { AuthorContext } from "./Helper/AuthorContext";

const BookDisplay = () => {
  const { bookData, handleAddBook } = useContext(BookContext);
  const { user } = useContext(UserContext);
  const { authorData } = useContext(AuthorContext);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    page_number: "",
    bookstore_id: "",
  });

  const [bookstores, setBookstores] = useState([]);

  useEffect(() => {
    fetch("/bookstores")
      .then((response) => response.json())
      .then((data) => setBookstores(data))
      .catch((err) => console.error("Error fetching bookstores:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "bookstore_id" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBook = {
      title: formData.title,
      author: formData.author,
      genre: formData.genre,
      page_number: Number(formData.page_number),
      bookstore_id: Number(formData.bookstore_id),
    };

    handleAddBook(newBook);
    setFormData({
      title: "",
      author: "",
      genre: "",
      page_number: "",
      bookstore_id: "",
    });
  };

  // Filter books for user (thats logged in)
  const filteredBooks = user
    ? bookData.filter((book) => book.user_id === user.id)
    : [];

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
    <div>
      {/* Form to add books */}
      <form onSubmit={handleSubmit} className="mb-8 p-4 bg-gray-100 rounded-md">
        <h2 className="text-lg font-bold mb-2">Add A New Book To Your Shelf</h2>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="block w-full p-2 mb-2 border rounded"
          />
        </div>

        <div>
          <label>Bookstore:</label>
          <select
            name="bookstore_id"
            value={formData.bookstore_id}
            onChange={handleChange}
            required
            className="block w-full p-2 mb-2 border rounded"
          >
            <option value="" disabled>
              Select Author
            </option>
            {authorData.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Genre:</label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
            className="block w-full p-2 mb-2 border rounded"
          />
        </div>

        <div>
          <label>Page Number:</label>
          <input
            type="number"
            name="page_number"
            value={formData.page_number}
            onChange={handleChange}
            required
            className="block w-full p-2 mb-2 border rounded"
          />
        </div>

        <div>
          <label>Bookstore:</label>
          <select
            name="bookstore_id"
            value={formData.bookstore_id}
            onChange={handleChange}
            required
            className="block w-full p-2 mb-2 border rounded"
          >
            <option value="" disabled>
              Select Bookstore
            </option>
            {bookstores.map((store) => (
              <option key={store.id} value={store.id}>
                {store.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Book
        </button>
      </form>

      {/* Filtered Book List */}
      <ul>
        {filteredBooks.length > 0 ? (
          filteredBooks.map((item) => (
            <li
              key={item.id}
              className="bg-gray-100 shadow-md rounded-md p-4 mb-4"
            >
              <Link
                to={`/books/${item.id}`}
                className="text-blue-500 hover:underline"
              >
                <p className="text-lg font-bold">Title: {item.title}</p>
                <p className="text-sm text-gray-600">
                  Author: {item.author?.name || item.author || "Unknown"}
                </p>
                <p className="text-sm text-gray-600">Genre: {item.genre}</p>
                <p className="text-sm text-gray-600">
                  Pages: {item.page_number}
                </p>
                <p className="text-sm text-gray-600">
                  Bookstore: {item.bookstore?.name || "Unknown"}
                </p>
              </Link>
            </li>
          ))
        ) : (
          <p>No books available for this user.</p>
        )}
      </ul>
    </div>
  );
};

export default BookDisplay;
