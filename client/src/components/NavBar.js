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
      <Link to="/books" style={{ margin: "0 10px" }}>
        Book Info
      </Link>
      <Link to="/tags" style={{ margin: "0 10px" }}>
        Tag Info
      </Link>
      <Link to="/libraries" style={{ margin: "0 10px" }}>
        Library
      </Link>
    </nav>
  );
}

export default NavBar;
