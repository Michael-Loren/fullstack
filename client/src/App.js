import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Customer from "./components/Customer";
import Employee from "./components/Employee";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <nav>
            <Link to="/">Customer</Link> <Link to="/employee">Employee</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Customer />} />
            <Route path="/employee" element={<Employee />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
