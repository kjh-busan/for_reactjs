import React from "react";
import ReactDOM from "react-dom";
import MineSearch from "./MineSearch";

import "./styles.css";

function App() {
  return <MineSearch />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
