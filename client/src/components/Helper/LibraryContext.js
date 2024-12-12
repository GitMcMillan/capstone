import { createContext, useEffect, useState } from "react";

export const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const [libraryData, setLibraryData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/libraries")
      .then((r) => r.json())
      .then((data) => setLibraryData(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <LibraryContext.Provider value={{ libraryData, setLibraryData }}>
      {children}
    </LibraryContext.Provider>
  );
};
