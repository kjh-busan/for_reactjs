import React from "react";
import ReactDOM from "react-dom";
import TicTacToe from "./TicTacToe";

import "./styles.css";

function App() {
  return <TicTacToe />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
