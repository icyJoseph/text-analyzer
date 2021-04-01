import "./styles/global.css";
import "./styles/header.css";
import "./styles/stats.css";
import "./styles/grid.css";
import "./styles/predictions.css";

import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
