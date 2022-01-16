import "./App.css";
import React from "react";
import {BrowserRouter, Routes, Route, Link, NavLink} from "react-router-dom"
import Customer from "./components/Customer";
import Employee from "./components/Employee";
function App() {
  return (
    <div className="App">
      <header>
        
        
      </header>
      <main>
        <BrowserRouter>
        
        
          <Routes>
            <Route path="/" element={<Customer/>}/>
            <Route path="/employee" element={<Employee/>}/>
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
