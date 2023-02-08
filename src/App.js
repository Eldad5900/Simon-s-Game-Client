import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "../src/views/Home/home";
import { GameStart } from "./views/GameStart/gameStart";
import React from "react"


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Game-Start" element={<GameStart />}></Route>
      </Routes>
    </div>
  );
}

export default App;
