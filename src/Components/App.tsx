import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Header } from "./Header";
import { Dashboard } from "./Dashboard";
import { Footer } from "./Footer";
import { getData } from "../functions";

function App() {
  async function data() {
    await getData()
  }
  useEffect(() => {data()}, [])
  return (
    <div className="App">
      <Header />
      <Dashboard />
      <Footer />
    </div>
  );
}

export default App;
