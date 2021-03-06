import React from "react";
import { useState, useEffect } from "react";

export default function Employee() {
  const [currentData, setCurrentData] = useState([]);

  async function fetchAPI() {
    const response = await fetch("http://localhost:5000/todos/");
    const data = await response.json();
    console.log(data);
    setCurrentData(data);
  }

  useEffect(async () => {
    fetchAPI();
  }, []);

  async function onClick(id) {
    try {
      const response = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });
      console.log(response);
      alert("Order complete!");
      window.location.reload();
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Order</th>
            <th>Complete</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((data) => {
            return (
              <tr key={data.todo_id}>
                <td>{data.todo_id}</td>
                <td>{data.description}</td>
                <td>
                  <button
                    onClick={() => {
                      onClick(data.todo_id);
                    }}
                  >
                    X
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
