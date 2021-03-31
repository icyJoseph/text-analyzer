import "../styles/spinner.css";
import React from "react";

// Taken from: https://tobiasahlin.com/spinkit/

export const Spinner = () => (
  <div className="sk-chase">
    <div className="sk-chase-dot"></div>
    <div className="sk-chase-dot"></div>
    <div className="sk-chase-dot"></div>
    <div className="sk-chase-dot"></div>
    <div className="sk-chase-dot"></div>
    <div className="sk-chase-dot"></div>
  </div>
);
