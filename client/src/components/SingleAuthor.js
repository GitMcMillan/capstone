import React, { useContext, useEffect } from "react";
import { AuthorContext } from "./Helper/AuthorContext";
import { useParams } from "react-router-dom";

const SingleAuthor = () => {
  const { id } = useParams();
  const { fetchAuthorById, authorById } = useContext(AuthorContext);
  console.log("Author details:", authorById);
  console.log("Fetched ID:", id);

  useEffect(() => {
    fetchAuthorById(parseInt(id));
  }, [id, fetchAuthorById]);

  if (!authorById) {
    return <p>Loading Author details...</p>;
  }

  return (
    <div>
      <h1>Author: {authorById.name}</h1>
    </div>
  );
};

export default SingleAuthor;
