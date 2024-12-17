import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./NavBar";
import BookDisplay from "./BookList";
import BookstoreDisplay from "./BookstoreList";
import AuthorDisplay from "./AuthorList";
import SingleBook from "./SingleBook";
import SingleAuthor from "./SingleAuthor";
import LoginForm from "./LoginForm";
import { UserProvider } from "./Helper/Context";
import { BookProvider } from "./Helper/BookContext";
import { BookstoreProvider } from "./Helper/BookstoreContext";
import { AuthorProvider } from "./Helper/AuthorContext";

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
        <BookstoreProvider>
          <AuthorProvider>
            <Router>
              <NavBar />
              <Switch>
                <Route exact path="/login" component={LoginForm} />
                {/* <Route path="/users" component={UserDisplay} /> */}
                <Route path="/books/:id" component={SingleBook} />
                <Route path="/books" component={BookDisplay} />
                <Route path="/bookstores" component={BookstoreDisplay} />
                <Route path="/authors/:id" component={SingleAuthor} />
                <Route path="/authors" component={AuthorDisplay} />
              </Switch>
            </Router>
          </AuthorProvider>
        </BookstoreProvider>
      </BookProvider>
    </UserProvider>
  );
}

export default App;
