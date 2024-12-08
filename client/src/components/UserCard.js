import React from "react";

const UserCard = ({ user }) => {
  return (
    <li className="bg-red-500 text-white text-2xl font-bold border-4 border-black shadow-lg p-6 mb-6">
      <p className="text-lg font-bold">Username: {user.username}</p>
      <p className="text-sm text-gray-600">Email: {user.email}</p>
      <div className="bg-blue-500 text-white p-10">
        Tailwind working if blue
      </div>
    </li>
  );
};

export default UserCard;
