import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import NavBar from "./NavBar";
import UserDisplay from "./UserList";
import BookDisplay from "./BookList";
import TagDisplay from "./TagList";
import LibraryDisplay from "./LibraryList";
import Home from "./Home";
import { UserProvider } from "./Helper/Context";
import { BookProvider } from "./Helper/BookContext";
import { TagProvider } from "./Helper/TagContext";
import { LibraryProvider } from "./Helper/LibraryContext";

function App() {
  //set state values

  //useeffect fetch call
  //fetch to address
  //then convert to json
  //convert json data to new state
  //.catch for errors

  return (
    <UserProvider>
      <BookProvider>
        <TagProvider>
          <LibraryProvider>
            <Router>
              <NavBar />
              <nav>
                <Link to="/">Home</Link> | <Link to="/users">User Data</Link> |
                <Link to="/books">Book Data</Link> |
                <Link to="/tags">Category Data</Link> |
                <Link to="/libraries">Library Data</Link>
              </nav>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/users" component={UserDisplay} />
                <Route path="/books" component={BookDisplay} />
                <Route path="/tags" component={TagDisplay} />
                <Route path="/libraries" component={LibraryDisplay} />
              </Switch>
            </Router>
          </LibraryProvider>
        </TagProvider>
      </BookProvider>
    </UserProvider>
  );
}

export default App;
