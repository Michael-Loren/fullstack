import React from "react";

export default function Customer() {

function onSubmit(e){
    
    e.preventDefault();
}
  return (
    <div>
      <form>
        <select name="food">
          <option value="none" selected disabled hidden>
            Select something
          </option>
          <option value="Cooka da meatball">Cooka da meatball</option>
          <option value="Burger">Burger</option>
          <option value="Pasta">Pasta</option>
          <option value="Pasta">Pasta</option>
        </select>
        <button type="submit" onSubmit={(e) => {onSubmit}}>Place order</button>
      </form>
    </div>
  );
}
