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
    <div>
      <h1>{bookById.title}</h1>
      <p>Genre: {bookById.genre}</p>
      <p>Pages: {bookById.page_number}</p>
      <p>Author: {bookById.author?.name || "Unknown Author"}</p>
      <p>Bookstore: {bookById.bookstore?.name || "Unknown Bookstore"}</p>
    </div>
  );
};

export default SingleBook;
