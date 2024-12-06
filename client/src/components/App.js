import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

function App() {
  //set state values
  const [testData, setTestData] = useState([]);

  //useeffect fetch call
  //fetch to address
  //then convert to json
  //convert json data to new state
  //.catch for errors
  useEffect(() => {
    fetch("http://127.0.0.1:5555/test")
      .then((r) => r.json())
      .then((data) => setTestData(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  function HomePage() {
    return <h1>HomePage</h1>;
  }

  function TestPage({ testData }) {
    return (
      <div>
        <h1>Test Data</h1>
        <ul>
          {testData.length > 0 ? (
            testData.map((item, index) => (
              <li key={index}>{JSON.stringify(item)}</li>
            ))
          ) : (
            <p>No test data available</p>
          )}
        </ul>
      </div>
    );
  }

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/test">Test Data</Link>
      </nav>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route
          path="/test"
          component={() => <TestPage testData={testData} />}
        />
      </Switch>
    </Router>
  );
}

export default App;
