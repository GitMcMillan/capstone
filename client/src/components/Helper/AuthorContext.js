import { createContext, useEffect, useState } from "react";

export const AuthorContext = createContext();

export const AuthorProvider = ({ children }) => {
  const [authorData, setAuthorData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/authors")
      .then((r) => r.json())
      .then((data) => setAuthorData(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <AuthorContext.Provider value={{ authorData, setAuthorData }}>
      {children}
    </AuthorContext.Provider>
  );
};
