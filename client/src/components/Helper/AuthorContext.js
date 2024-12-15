import { createContext, useEffect, useState } from "react";

export const AuthorContext = createContext();

export const AuthorProvider = ({ children }) => {
  const [authorData, setAuthorData] = useState([]);
  const [authorById, setAuthorById] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/authors")
      .then((r) => r.json())
      .then((data) => setAuthorData(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const fetchAuthorById = (id) => {
    const authorid = authorData.find((author) => author.id === parseInt(id));
    if (authorid) {
      setAuthorById(authorid);
    } else {
      fetch(`http://127.0.0.1:5555/authors/${id}`)
        .then((r) => r.json())
        .then((author) => setAuthorById(author))
        .catch((error) => console.error("Error:", error));
    }
  };

  return (
    <AuthorContext.Provider
      value={{ authorData, setAuthorData, fetchAuthorById, authorById }}
    >
      {children}
    </AuthorContext.Provider>
  );
};
