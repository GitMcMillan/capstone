import React, { useContext, useEffect } from "react";
import { AuthorContext } from "./Helper/AuthorContext";
import { useParams } from "react-router-dom";
import { UserContext } from "./Helper/Context";

const SingleAuthor = () => {
  const { id } = useParams();
  const { fetchAuthorById, authorById } = useContext(AuthorContext);
  const { user } = useContext(UserContext);
  console.log("Author details:", authorById);
  console.log("Fetched ID:", id);
  console.log("Authors books", authorById.books);

  useEffect(() => {
    fetchAuthorById(parseInt(id));
  }, [id, fetchAuthorById]);

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
      <h1 className="text-lg font-bold">
        Author: {authorById?.name || "Unknown Author"}
      </h1>
      <h2 className="text-sm text-gray-600">Books by {authorById?.name}:</h2>
      <ul>
        {authorById?.books?.length > 0 ? (
          authorById.books.map((book) => (
            <li className="text-sm text-gray-600" key={book.id}>
              {book.title}
            </li>
          ))
        ) : (
          <li>No books available</li>
        )}
      </ul>
    </div>
  );
};

export default SingleAuthor;
