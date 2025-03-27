let inventory;

(function () {
  inventory = {
    lastId: 0,
    collection: [],
    setDate: function () {
      let date = new Date();
      document.getElementById("order_date").textContent = date.toUTCString();
    },
    cacheTemplate: function () {
      let iTmpl = document.getElementById("inventory_item");
      iTmpl.remove();
      this.template = Handlebars.compile(iTmpl.getHTML());
    },
    add: function () {
      this.lastId++;
      let item = {
        id: this.lastId,
        name: "",
        stock_number: "",
        quantity: 1,
      };
      this.collection.push(item);

      return item;
    },
    remove: function (idx) {
      this.collection = this.collection.filter(function (item) {
        return item.id !== idx;
      });
    },
    get: function (id) {
      let found_item;

      this.collection.forEach(function (item) {
        if (item.id === id) {
          found_item = item;
          return false;
        }
      });

      return found_item;
    },
    update: function (item) {
      //Get id of item and
      let id = this.findID(item);
      let itemObject = this.get(id);

      itemObject.name = item.querySelector("[name^=item_name]").value;
      itemObject.stock_number = item.querySelector(
        "[name^=item_stock_number]"
      ).value;
      itemObject.quantity = item.querySelector("[name^=item_quantity]").value;
    },
    newItem: function (e) {
      e.preventDefault();
      let item = this.add(); //Create a new item
      let itemHtml = this.template(item); //Create html for new item in table
      let itemElement = document.createElement("tr"); //Create new element to house html
      itemElement.innerHTML = itemHtml; //Add html to item element

      //Add newly created item element to table
      document
        .getElementById("inventory")
        .firstElementChild.appendChild(itemElement);
    },
    findParent: function (e) {
      return e.target.closest("tr");
    },
    findID: function (item) {
      return +item.querySelector("input[type=hidden]").value;
    },
    deleteItem: function (e) {
      //Only delete when clicking on a link with the delete class
      if (!e.target.tagName === "A" || !e.target.classList.contains("delete"))
        return;

      e.preventDefault();
      let item = this.findParent(e); //Get parent tr
      item.remove(); //Remove tr

      this.remove(this.findID(item)); //Get id of item and remove it from collection
    },
    updateItem: function (e) {
      if (!["INPUT", "TEXTAREA", "SELECT", "BUTTON"].includes(e.tagName))
        return;

      let item = this.findParent(e);

      this.update(item);
    },
    bindEvents: function () {
      //Adds item creation event listener
      document
        .getElementById("add_item")
        .addEventListener("click", this.newItem.bind(this));

      //Item removal event listener
      document
        .getElementById("inventory")
        .addEventListener("click", this.deleteItem.bind(this));

      //Item update event listener
      document
        .getElementById("inventory")
        .addEventListener("blur", this.updateItem.bind(this));
    },
    init: function () {
      this.setDate();
      this.cacheTemplate();
      this.bindEvents();
    },
  };
})();

document.addEventListener("DOMContentLoaded", inventory.init.bind(inventory));
