import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "./App.css";

import AddTutorial from "./components/AddTutorial";
import Tutorial from "./components/Tutorial";
import Home from "./components/Home";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/tutorials" className="navbar-brand">
          Tutorial Manager
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link reloadDocument to={"/tutorials"} className="nav-link">
              Tutorials
            </Link>
          </li>
          <li className="nav-item">
            <Link reloadDocument to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/tutorials" Component={Home} />
          <Route path="/" Component={Home} />
          <Route path="/add" Component={AddTutorial} />
          <Route path="/tutorials/:id" Component={Tutorial} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
