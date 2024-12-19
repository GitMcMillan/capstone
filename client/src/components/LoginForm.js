import React, { useState, useContext } from "react";
import { UserContext } from "./Helper/Context";

function LoginForm() {
  const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // const [loggedInUser, setLoggedInUser] = useState(null);
  const { logInUser } = useContext(UserContext);
  // delete
  const handleSubmit = (event) => {
    event.preventDefault();
    const loginData = { username, password };

    logInUser(loginData)
      .then(() => {
        setError("");
        window.location.href = "/";
      })
      .catch(() => {
        setError("Wrong login information");
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          {/* <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div> */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
