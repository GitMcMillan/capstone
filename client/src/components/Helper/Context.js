import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/users")
      .then((r) => r.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  function logInUser(loginData) {
    fetch("/login", {
      method: "POST",
      headers: {
        Content_Type: "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(loginData),
    });
  }

  return (
    <UserContext.Provider value={{ userData, setUserData, logInUser }}>
      {children}
    </UserContext.Provider>
  );
};
