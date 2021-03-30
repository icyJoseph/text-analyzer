import React from "react";
import { TextArea } from "./components/TextArea";
import { useReadingTime } from "./reader/stream";

function App() {
  const stats = useReadingTime();

  return (
    <div className="App">
      <header className="App-header">
        <p>Hello Vite + React!</p>
        <p>Type something</p>
      </header>
      <main>
        <p>{stats.text}</p>
        <TextArea />
      </main>
    </div>
  );
}

export default App;
