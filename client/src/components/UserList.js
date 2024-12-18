import React, { useContext } from "react";
import { UserContext } from "./Helper/Context";

const UserDisplay = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h1>User Data</h1>
      <ul>
        {user.length > 0 ? (
          user.map((item) => (
            <li
              key={item.id}
              className="bg-gray-100 shadow-md rounded-md p-4 mb-4"
            >
              <p className="text-lg font-bold">Username: {item.username}</p>
              <p className="text-sm text-gray-600">Email: {item.email}</p>
            </li>
          ))
        ) : (
          <p>data not showing</p>
        )}
      </ul>
    </div>
  );
};

export default UserDisplay;
