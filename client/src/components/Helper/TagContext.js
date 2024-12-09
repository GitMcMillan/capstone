import { createContext, useEffect, useState } from "react";

export const TagContext = createContext();

export const TagProvider = ({ children }) => {
  const [tagData, setTagData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/tags")
      .then((r) => r.json())
      .then((data) => setTagData(data))
      .catch((error) => console.error("Error:", error));
  }, []);
  console.log(tagData);

  return (
    <TagContext.Provider value={{ tagData, setTagData }}>
      {children}
    </TagContext.Provider>
  );
};
