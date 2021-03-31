import "./styles/header.css";
import "./styles/stats.css";

import React, { Fragment } from "react";
import { TextArea } from "./components/TextArea";
import { useReadingTime } from "./reader/stream";

function App() {
  const stats = useReadingTime();

  return (
    <Fragment>
      <header className="header pure-u-1">
        <h1>Hello!</h1>
        <p>Type something</p>
      </header>
      <main className="pure-u-1">
        <section className="pure-u-1-5"></section>
        <section className="pure-u-3-5">
          <div className="stats-view pure-u-1">
            <span className="stats pure-u-1-3">{stats.text}</span>
            <span className="stats pure-u-1-3">
              {stats.words} {stats.words === 1 ? "word" : "words"}
            </span>
            <span className="stats pure-u-1-3">
              {stats.characters} characters
            </span>
          </div>
          <TextArea />
        </section>
      </main>
    </Fragment>
  );
}

export default App;
