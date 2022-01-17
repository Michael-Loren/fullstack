import React, { useState } from "react";

export default function Customer() {
  const [currentOption, setCurrentOption] = useState("");

  function onChange(e) {
    setCurrentOption(e.target.value);
  }

  async function onSubmit(e) {
    e.preventDefault(); //remove later
    try {
      console.log(currentOption)
      const order = {description: currentOption}
      if (order) {
        console.log(Object.keys(order));
        const response = await fetch("http://localhost:5000/todos/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(order),
        });
        console.log(response);
        

        alert("order has been placed!");
      } else {
        alert("Select an order");
      }
    } catch (error) {
      console.error(error.message)
    }
  }
  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <select name="food" defaultValue="none" onChange={(e) => onChange(e)}>
          <option value="none" disabled hidden>
            Select something
          </option>
          <option value="Cooka da meatball">Cooka da meatball</option>
          <option value="Burger">Burger</option>
          <option value="Pasta">Pasta</option>
          <option value="Garden mushrooms">
            Garden mushrooms (you are liable)
          </option>
          <option value="Food">Food</option>
          <option value="Cardboard">Cardboard + salt</option>
        </select>
        <button type="submit">Place order</button>
      </form>
    </div>
  );
}
