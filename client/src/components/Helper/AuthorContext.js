// erase
import { createContext, useEffect, useState } from "react";

export const AuthorContext = createContext();

export const AuthorProvider = ({ children }) => {
  const [authorData, setAuthorData] = useState([]);
  const [authorById, setAuthorById] = useState([]);

  useEffect(() => {
    fetch("/authors")
      .then((r) => r.json())
      .then((data) => setAuthorData(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleAddAuthor = (newAuthor) => {
    fetch("/authors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAuthor),
    })
      .then((response) => response.json())
      .then((addedAuthor) => {
        setAuthorData((prev) => [...prev, addedAuthor]);
      })
      .catch((error) => console.error("Error adding author:", error));
  };

  const fetchAuthorById = (id) => {
    const authorid = authorData.find((author) => author.id === parseInt(id));
    if (authorid) {
      setAuthorById(authorid);
    } else {
      fetch(`/authors/${id}`)
        .then((r) => r.json())
        .then((author) => setAuthorById(author))
        .catch((error) => console.error("Error:", error));
    }
  };

  return (
    <AuthorContext.Provider
      value={{
        authorData,
        setAuthorData,
        fetchAuthorById,
        authorById,
        handleAddAuthor,
      }}
    >
      {children}
    </AuthorContext.Provider>
  );
};
