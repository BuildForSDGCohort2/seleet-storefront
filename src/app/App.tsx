import React from "react";
import { Route } from "react-router-dom";

import { NavBar } from "../components";
import Home from "../views/Home";
import "./App.scss";

const App: React.FC = () => {
  return (
    <div>
      <NavBar />
      <Route exact path="/" component={Home} />
    </div>
  );
};

export default App;
