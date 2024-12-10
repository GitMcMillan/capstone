import React, { useContext } from "react";
import { TagContext } from "./Helper/TagContext";

const TagDisplay = () => {
  const { tagData } = useContext(TagContext);

  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {tagData.length > 0 ? (
          tagData.map((item) => (
            <li
              key={item.id}
              className="bg-gray-100 shadow-md rounded-md p-4 mb-4"
            >
              <p className="text-lg font-bold">Genre: {item.genre}</p>
              <p className="text-sm text-gray-600 flex items-center">
                Best Seller:
                <span className="ml-2">
                  {item.best_seller ? (
                    <span className="text-green-500 text-xl">✔</span>
                  ) : (
                    <span className="text-red-500 text-xl">✘</span>
                  )}
                </span>
              </p>
              <p className="text-sm text-gray-600 flex items-center">
                Fiction:
                <span className="ml-2">
                  {item.fiction ? (
                    <span className="text-green-500 text-xl">✔</span>
                  ) : (
                    <span className="text-red-500 text-xl">✘</span>
                  )}
                </span>
              </p>
              <p className="text-sm text-gray-600 flex items-center">
                Awards:
                <span className="ml-2">
                  {item.award_winner ? (
                    <span className="text-green-500 text-xl">✔</span>
                  ) : (
                    <span className="text-red-500 text-xl">✘</span>
                  )}
                </span>
              </p>
              <p className="text-sm text-gray-600 flex items-center">
                New Release:
                <span className="ml-2">
                  {item.new_release ? (
                    <span className="text-green-500 text-xl">✔</span>
                  ) : (
                    <span className="text-red-500 text-xl">✘</span>
                  )}
                </span>
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
