import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import NavBar from "./NavBar";
import UserCard from "./UserCard";

function App() {
  //set state values
  const [userData, setUserData] = useState([]);

  //useeffect fetch call
  //fetch to address
  //then convert to json
  //convert json data to new state
  //.catch for errors
  useEffect(() => {
    fetch("http://127.0.0.1:5555/users")
      .then((r) => r.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error("Error:", error));
  }, []);
  console.log(userData);

  function HomePage() {
    return <h1>HomePage</h1>;
  }

  function UserPage({ userData }) {
    return (
      <div>
        <h1>User Data</h1>
        <ul>
          {userData.length > 0 ? (
            userData.map((item, index) => <UserCard key={index} user={item} />)
          ) : (
            <p>No test data available</p>
          )}
        </ul>
      </div>
    );
  }

  return (
    <Router>
      <NavBar />
      <nav>
        <Link to="/">Home</Link> | <Link to="/users">User Data</Link>
      </nav>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route
          path="/users"
          component={() => <UserPage userData={userData} />}
        />
      </Switch>
    </Router>
  );
}

export default App;
