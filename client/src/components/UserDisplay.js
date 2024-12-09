import React from "react";

const UserDisplay = ({ user }) => {
  return (
    <li className="bg-gray-100 shadow-md rounded-md p-4 mb-4">
      <p className="text-lg font-bold">Username: {user.username}</p>
      <p className="text-sm text-gray-600">Email: {user.email}</p>
    </li>
  );
};

export default UserDisplay;
