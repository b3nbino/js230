document.addEventListener("DOMContentLoaded", () => {
  let form = document.querySelector("form");
  let nameInput = document.querySelector("#itemName");
  let quantityInput = document.querySelector("#itemQuantity");
  let ul = document.querySelector("#groceryList");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    //Get input values and construct li string
    let itemName = nameInput.value;
    let itemQuantity = quantityInput.value;
    let liText = itemQuantity
      ? itemQuantity + " " + itemName
      : "1" + " " + itemName;

    //Create li with proper text, then add it to the ul
    let itemLi = document.createElement("li");
    itemLi.textContent = liText;
    ul.appendChild(itemLi);

    //Reset the form
    form.reset();
  });
});
