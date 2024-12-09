import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import NavBar from "./NavBar";
import UserDisplay from "./UserList";
import BookDisplay from "./BookList";
import Home from "./Home";
import { UserProvider } from "./Helper/Context";
import { BookProvider } from "./Helper/BookContext";

function App() {
  //set state values

  // const [bookData, setBookData] = useState([]);

  //useeffect fetch call
  //fetch to address
  //then convert to json
  //convert json data to new state
  //.catch for errors

  return (
    <UserProvider>
      <BookProvider>
        <Router>
          <NavBar />
          <nav>
            <Link to="/">Home</Link> | <Link to="/users">User Data</Link> |
            <Link to="/books">Book Data</Link>
          </nav>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/users" component={UserDisplay} />
            <Route path="/books" component={BookDisplay} />
          </Switch>
        </Router>
      </BookProvider>
    </UserProvider>
  );
}

export default App;
