// erazASe
import React, { useContext } from "react";
import { AuthorContext } from "./Helper/AuthorContext";
import { BookContext } from "./Helper/BookContext";
import { Link } from "react-router-dom";
import { UserContext } from "./Helper/Context";

const AuthorDisplay = () => {
  const { authorData } = useContext(AuthorContext);
  const { bookData } = useContext(BookContext);
  const { user } = useContext(UserContext);

  // const associatedAuthors = authorData.filter((author) =>
  //   bookData.some((book) => book.author_id === author.id)
  // );

  const associatedAuthors = user
    ? authorData.filter((author) =>
        bookData.some(
          (book) => book.author_id === author.id && book.user_id === user.id
        )
      )
    : [];

  // Filter books for user (thats logged in)
  // const filteredBooks = user
  //   ? bookData.filter((book) => book.user_id === user.id) // Match book's user_id with logged-in user
  //   : [];

  return (
    <div>
      <h1>Authors</h1>
      <ul>
        {associatedAuthors.length > 0 ? (
          associatedAuthors.map((author) => (
            <li
              key={author.id}
              className="bg-gray-100 shadow-md rounded-md p-4 mb-4"
            >
              <Link
                to={`/authors/${author.id}`}
                className="text-blue-500 hover:underline"
              >
                <p className="text-lg font-bold">{author.name}</p>
              </Link>
            </li>
          ))
        ) : (
          <p>No authors to display.</p>
        )}
      </ul>
    </div>
  );
};

export default AuthorDisplay;
