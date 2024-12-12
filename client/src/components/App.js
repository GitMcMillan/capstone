import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./NavBar";
import UserDisplay from "./UserList";
import BookDisplay from "./BookList";
import TagDisplay from "./TagList";
import LibraryDisplay from "./LibraryList";
import LoginForm from "./LoginForm";
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
              <Switch>
                <Route exact path="/login" component={LoginForm} />
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
