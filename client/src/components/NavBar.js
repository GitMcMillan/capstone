import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav
      style={{
        padding: "10px",
        backgroundColor: "orange",
        borderBottom: "1px solid #ccc",
      }}
    >
      <Link to="/login" style={{ margin: "0 10px" }}>
        LogIn
      </Link>
      <Link to="/" style={{ margin: "0 10px" }}>
        Home
      </Link>
      <Link to="/users" style={{ margin: "0 10px" }}>
        User Info
      </Link>
      <Link to="/books" style={{ margin: "0 10px" }}>
        Book Info
      </Link>
      <Link to="/authors" style={{ margin: "0 10px" }}>
        Authors
      </Link>
      <Link to="/bookstores" style={{ margin: "0 10px" }}>
        Book Stores
      </Link>
    </nav>
  );
}

export default NavBar;
