import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

import { genFirstNames } from "./api/namesApi";

function App() {
  const [names, setNames] = useState([]);

  useEffect(function genFirstNames() {
    search();
  }, []);

  async function search(term) {
    const response = await genFirstNames("neutral");
    setNames(response);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      {!names.length ? (
        <p className="no-results">
          Sorry, there are no jobs that match your search
        </p>
      ) : (
        names.map((name, index) => (
          <li id={index} key={index}>
            {name}
          </li>
        ))
      )}
    </div>
  );
}

export default App;
