// erzase
import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "./Helper/Context";

const Logout = () => {
  const { setUser } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    fetch("/logout", { method: "DELETE" })
      .then((response) => {
        if (response.ok) {
          setUser(null);
          history.push("/login");
        } else {
          console.error("Logout failed");
        }
      })
      .catch((error) => console.error("Logout error:", error));
  }, [setUser, history]);

  return <p>Logging out...</p>;
};

export default Logout;
