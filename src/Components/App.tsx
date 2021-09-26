import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Header } from "./Header";
import { Dashboard } from "./Dashboard";
import { Col, Row } from "react-bootstrap";
import { BiGroup } from "react-icons/bi";
import { FaCommentsDollar } from "react-icons/fa";
import { GrVirtualMachine } from "react-icons/gr";
import { GiCardExchange } from "react-icons/gi";
import { Footer } from "./Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Dashboard />
      <Footer />
    </div>
  );
}

export default App;
