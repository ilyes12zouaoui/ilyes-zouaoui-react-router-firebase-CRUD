import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AppRouter from "./router/AppRouter";
import "./configs/firebase"
function App() {
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
