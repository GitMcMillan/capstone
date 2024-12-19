import { React, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./Helper/Context";

const HomePage = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return (
      <div className="text-center p-4">
        <h2 className="text-xl font-bold text-red-600">
          You are not logged in
        </h2>
        <p className="text-gray-600">
          Please click <span className="font-bold">Log In</span> above.
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          Welcome To Your Bookshelf
        </h1>
        <h2 className="text-xl font-semibold mb-6 text-gray-600">
          From here you can:
        </h2>
        <div className="space-y-4">
          <Link
            to="/books"
            className="block w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
          >
            Look at your bookshelf
          </Link>
          <Link
            to="/bookstores"
            className="block w-full py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition"
          >
            Look at Bookstores
          </Link>
          <Link
            to="/authors"
            className="block w-full py-2 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition"
          >
            See Author Collections
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
