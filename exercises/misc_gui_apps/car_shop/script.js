const cars = [
  {
    make: "Honda",
    image: "images/honda-accord-2005.jpg",
    model: "Accord",
    year: 2005,
    price: 7000,
  },
  {
    make: "Honda",
    image: "images/honda-accord-2008.jpg",
    model: "Accord",
    year: 2008,
    price: 11000,
  },
  {
    make: "Toyota",
    image: "images/toyota-camry-2009.jpg",
    model: "Camry",
    year: 2009,
    price: 12500,
  },
  {
    make: "Toyota",
    image: "images/toyota-corrolla-2016.jpg",
    model: "Corolla",
    year: 2016,
    price: 15000,
  },
  {
    make: "Suzuki",
    image: "images/suzuki-swift-2014.jpg",
    model: "Swift",
    year: 2014,
    price: 9000,
  },
  {
    make: "Audi",
    image: "images/audi-a4-2013.jpg",
    model: "A4",
    year: 2013,
    price: 25000,
  },
  {
    make: "Audi",
    image: "images/audi-a4-2013.jpg",
    model: "A4",
    year: 2013,
    price: 26000,
  },
];

document.addEventListener("DOMContentLoaded", () => {
  let filterForm = document.querySelector("#filter");
  let main = document.querySelector("main");

  //Selects
  let makeSelect = document.getElementById("make");
  let modelSelect = document.getElementById("model");
  let priceSelect = document.getElementById("price");
  let yearSelect = document.getElementById("year");

  function getUniquePropertyArr(array, property) {
    return array
      .map((obj) => obj[property])
      .filter((prop, idx, arr) => idx === arr.indexOf(prop));
  }

  function createOptions(arr) {
    return arr.map((opt) => {
      let option = document.createElement("option");
      option.setAttribute("value", opt.toString().toLowerCase());
      option.textContent = opt;

      return option;
    });
  }

  function getFilteredCars(selections) {
    let result = cars.slice();

    if (selections.make !== "All") {
      console.log(selections.make);

      result = result.filter(
        (obj) => obj.make.toLowerCase() === selections.make
      );
    }

    if (selections.model !== "All") {
      result = result.filter(
        (obj) => obj.model.toLowerCase() === selections.model
      );
    }

    if (selections.price !== "All") {
      result = result.filter((obj) => obj.price === Number(selections.price));
    }

    if (selections.year !== "All") {
      result = result.filter((obj) => obj.year === Number(selections.year));
    }

    return result;
  }

  function clearCars() {
    let carContainers = main.childNodes;

    while (carContainers.length > 0) {
      carContainers[0].remove();
    }
  }

  function renderCars(carsArr) {
    carsArr.forEach((car) => {
      let container = document.createElement("div");
      container.classList.add("container");

      let img = document.createElement("img");
      img.setAttribute("src", car.image);
      img.setAttribute("alt", car.model);

      let h2 = document.createElement("h2");
      h2.textContent = car.make + " " + car.model;

      let yearP = document.createElement("p");
      yearP.textContent = "Year: " + car.year;

      let priceP = document.createElement("p");
      priceP.textContent = "Price: $" + car.price;

      let buyButton = document.createElement("a");
      buyButton.setAttribute("href", "#");
      buyButton.textContent = "Buy";

      container.appendChild(img);
      container.appendChild(h2);
      container.appendChild(yearP);
      container.appendChild(priceP);
      container.appendChild(buyButton);

      main.appendChild(container);
    });
  }

  //Get unique properties as arrays
  let makes = getUniquePropertyArr(cars, "make").sort();
  let models = getUniquePropertyArr(cars, "model").sort();
  let prices = getUniquePropertyArr(cars, "price").sort((a, b) => a - b);
  let years = getUniquePropertyArr(cars, "year").sort((a, b) => a - b);

  //Create and add options
  createOptions(makes).forEach((opt) => makeSelect.appendChild(opt));
  createOptions(models).forEach((opt) => modelSelect.appendChild(opt));
  createOptions(prices).forEach((opt) => priceSelect.appendChild(opt));
  createOptions(years).forEach((opt) => yearSelect.appendChild(opt));

  //Create and add cars
  renderCars(cars);

  filterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let filterSelections = {
      make: makeSelect.value,
      model: modelSelect.value,
      price: priceSelect.value,
      year: yearSelect.value,
    };

    let filteredCars = getFilteredCars(filterSelections);

    console.log(filteredCars);

    clearCars();
    renderCars(filteredCars);
  });
});
