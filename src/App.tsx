import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Admin from "./Pages/Admin";
import Home from "./Pages/Home";

const App:React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Admin" Component={Admin} />
        <Route path="/Home" Component={Home} />
        <Route path="/" Component={Login} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
