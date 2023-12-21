import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Admin from "./Pages/Admin";
import Home from "./Pages/Home";
import Search from "./Pages/Search";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Admin" Component={Admin} />
        <Route path="/Home" Component={Home} />
        <Route path="/" Component={Login} />
        <Route path="/Search" Component={Search} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
