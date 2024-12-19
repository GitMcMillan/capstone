// eraszesss
import React, { useContext, useState } from "react";
import { AuthorContext } from "./Helper/AuthorContext";
import { Link } from "react-router-dom";

const AuthorDisplay = () => {
  const { authorData, handleAddAuthor } = useContext(AuthorContext);
  const [formData, setFormData] = useState({ name: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAuthor = { name: formData.name };
    handleAddAuthor(newAuthor);

    setFormData({ name: "" });
  };

  return (
    <div>
      {/* Form to Add an Author */}
      <form onSubmit={handleSubmit} className="mb-8 p-4 bg-gray-100 rounded-md">
        <h2 className="text-lg font-bold mb-2">Add A New Author</h2>
        <div>
          <label className="block text-sm font-medium mb-1">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="block w-full p-2 mb-4 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Author
        </button>
      </form>

      {/* Author List */}
      <h1 className="text-xl font-bold mb-4">Authors</h1>
      <ul>
        {authorData.length > 0 ? (
          authorData.map((author) => (
            <li
              key={author.id}
              className="bg-gray-100 shadow-md rounded-md p-4 mb-4"
            >
              <Link
                to={`/authors/${author.id}`}
                className="text-blue-500 hover:underline"
              >
                <p className="text-lg font-bold">{author.name}</p>
              </Link>
            </li>
          ))
        ) : (
          <p className="text-gray-600">No authors to display.</p>
        )}
      </ul>
    </div>
  );
};

export default AuthorDisplay;
