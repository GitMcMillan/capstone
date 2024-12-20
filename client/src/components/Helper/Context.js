import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/check_session").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      } else {
        setUser(null);
      }
    });
  }, []);

  // const checkSession = () => {
  //   return fetch("/check_session", { credentials: "include" }).then(
  //     (response) => {
  //       if (response.ok) {
  //         return response.json().then((user) => {
  //           setUser(user);
  //           return user;
  //         });
  //       } else {
  //         setUser(null);
  //         throw new Error("No active session");
  //       }
  //     }
  //   );
  // };

  // useEffect(() => {
  //   checkSession().catch((error) =>
  //     console.log("No active session on load:", error)
  //   );
  // }, []);

  const logInUser = (loginData) => {
    return fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
      credentials: "include",
    }).then((response) => {
      if (response.ok) {
        return response.json().then((user) => {
          setUser(user);
          return user;
        });
      } else {
        throw new Error("Login failed");
      }
    });
  };

  const signUpUser = (signupData) => {
    return fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
      credentials: "include",
    }).then((response) => {
      if (response.ok) {
        return response.json().then((newUser) => {
          setUser(newUser);
          return newUser;
        });
      } else {
        throw new Error("Signup failed");
      }
    });
  };

  const logOutUser = () => {
    return fetch("/logout", { method: "DELETE", credentials: "include" }).then(
      (response) => {
        if (response.ok) {
          setUser(null);
        } else {
          throw new Error("Logout failed");
        }
      }
    );
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, logInUser, logOutUser, signUpUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
