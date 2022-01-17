import React, { useState } from "react";

export default function Customer() {
  const [currentOption, setCurrentOption] = useState("");

  function onChange(e) {
    setCurrentOption(e.target.value)
  }

  function onSubmit(e) {
    if (currentOption){
    console.log(currentOption)
    alert("order has been placed!");
    }
    else{
      alert("Select an order");
    }
    e.preventDefault(); //remove later
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
          <option value="Garden mushrooms">Garden mushrooms (you are liable)</option>
          <option value="Food">Food</option>
          <option value="Cardboard">Cardboard + salt</option>
        </select>
        <button type="submit">Place order</button>
      </form>
    </div>
  );
}
