import React, { useContext } from "react";
import { TagContext } from "./Helper/TagContext";

const TagDisplay = () => {
  const { tagData } = useContext(TagContext);

  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {tagData.length > 0 ? (
          tagData.map((item, index) => (
            <li
              key={index}
              className="bg-gray-100 shadow-md rounded-md p-4 mb-4"
            >
              <p className="text-lg font-bold">Genre: {item.genre}</p>
              <p className="text-sm text-gray-600">
                Best Seller: {item.best_seller ? "Yes" : "No"}
              </p>
              <p className="text-sm text-gray-600">
                Fiction: {item.fiction ? "Yes" : "No"}
              </p>
              <p className="text-sm text-gray-600">
                Awards: {item.award_winner ? "Yes" : "No"}
              </p>
              <p className="text-sm text-gray-600">
                New Release: {item.new_release ? "Yes" : "No"}
              </p>
            </li>
          ))
        ) : (
          <p>data not showing</p>
        )}
      </ul>
    </div>
  );
};

export default TagDisplay;
