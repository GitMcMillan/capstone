import React from "react";

const UserCard = ({ user }) => {
  return (
    <li>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
    </li>
  );
};

export default UserCard;
