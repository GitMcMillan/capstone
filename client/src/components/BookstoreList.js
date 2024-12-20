// erase
import React, { useContext, useState } from "react";
import { BookstoreContext } from "./Helper/BookstoreContext";
import { UserContext } from "./Helper/Context";

const BookstoreDisplay = () => {
  const { bookstoreData, setBookstoreData } = useContext(BookstoreContext);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone_number: "",
  });
  const { user } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://127.0.0.1:5555/bookstores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((newStore) => {
        setBookstoreData((prev) => [...prev, newStore]);
        setFormData({ name: "", address: "", phone_number: "" });
      })
      .catch((error) => console.error("Error adding bookstore:", error));
  };

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
    <div>
      {/* Form to Add a Bookstore */}
      <form
        onSubmit={handleSubmit}
        className="mb-8 p-6 bg-gray-50 rounded-lg shadow-md"
      >
        <h2 className="text-lg font-bold mb-4">Add A New Bookstore</h2>
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="block w-full p-2 mb-4 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Address:
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="block w-full p-2 mb-4 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Phone Number:
          </label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            required
            className="block w-full p-2 mb-4 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Bookstore
        </button>
      </form>

      {/* Bookstore List */}
      <h1 className="text-xl font-bold mb-4">Bookstores</h1>
      <ul>
        {bookstoreData.length > 0 ? (
          bookstoreData.map((store) => (
            <li
              key={store.id}
              className="bg-gray-100 shadow-md rounded-md p-4 mb-4"
            >
              <p className="text-lg font-bold text-blue-500">
                Name: {store.name}
              </p>
              <p className="text-sm text-gray-600">Address: {store.address}</p>
              <p className="text-sm text-gray-600">
                Phone Number: {store.phone_number}
              </p>
            </li>
          ))
        ) : (
          <p className="text-gray-600">No bookstores to display.</p>
        )}
      </ul>
    </div>
  );
};

export default BookstoreDisplay;
