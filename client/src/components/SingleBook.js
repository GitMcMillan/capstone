import React, { useContext, useEffect } from "react";
import { BookContext } from "./Helper/BookContext";
import { useParams } from "react-router-dom";

const SingleBook = () => {
  const { id } = useParams();
  const { fetchBookById, bookById } = useContext(BookContext);
  console.log("Book details:", bookById);
  console.log("Fetched ID:", id);

  useEffect(() => {
    fetchBookById(parseInt(id));
  }, [id, fetchBookById]);

  if (!bookById) {
    return <p>Loading book details...</p>;
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
    </div>
  );
};

export default SingleBook;
