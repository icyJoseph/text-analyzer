import React, { Fragment } from "react";

import { Analysis } from "./compositions/Analysis";
import { Header } from "./compositions/Header";
import { ReadingStats } from "./compositions/ReadingStats";

export function App() {
  return (
    <Fragment>
      <Header />

      <main className="pure-u-1 entry">
        <ReadingStats />

        <Analysis />
      </main>

      <footer className="pure-u-1 entry"></footer>
    </Fragment>
  );
}
