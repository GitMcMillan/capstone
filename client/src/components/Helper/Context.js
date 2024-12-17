import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState([]);
  // const [logInData, setLogInData] = useState(null);

  // Fetch all users onlanding
  useEffect(() => {
    fetch("http://127.0.0.1:5555/users")
      .then((r) => r.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Handle user login
  const logInUser = (loginData) => {
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error logging in:", error));
  };

  return (
    <UserContext.Provider value={{ userData, setUserData, logInUser }}>
      {children}
    </UserContext.Provider>
  );
};
