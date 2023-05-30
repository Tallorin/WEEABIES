// JavaScript for Responsive layout
const close = document.querySelector(".close");
const open = document.querySelector(".ham");
const menu = document.querySelector(".menu");
const modal = document.getElementById("myModal");

close.addEventListener("click", closeModal);
open.addEventListener("click", () => {
  menu.style.visibility = "visible";
});

// Product Filtering
document.addEventListener("DOMContentLoaded", () => {
  const categoryButtons = document.querySelectorAll(".category-btn");
  const items = document.querySelectorAll(".items");

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedCategory = button.dataset.category;

      items.forEach((item) => {
        const itemCategory = item.dataset.category;

        if (selectedCategory === "all" || selectedCategory === itemCategory) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
});

// Function to add an item to the cart
function addToCart(itemName, itemPrice) {
  var cartItems = document.getElementById("cart-items");
  var modalCartItems = document.getElementById("modal-cart-items");
  var totalElement = document.getElementById("total");
  var modalTotalElement = document.getElementById("modal-total");

  // Create a new list item for the cart
  var listItem = document.createElement("tr");

  // Create table cells for product name, price, and remove button
  var nameCell = document.createElement("td");
  nameCell.innerText = itemName;

  var priceCell = document.createElement("td");
  priceCell.innerText = "$" + itemPrice;

  var removeCell = document.createElement("td");
  var removeButton = document.createElement("button");
  removeButton.innerText = "Remove";
  removeButton.addEventListener("click", function() {
    removeFromCart(listItem, itemPrice);
  });

  removeCell.appendChild(removeButton);

  // Append cells to the list item
  listItem.appendChild(nameCell);
  listItem.appendChild(priceCell);
  listItem.appendChild(removeCell);

  // Append the list item to the cart
  cartItems.appendChild(listItem);

  // Create a new row for the modal cart
  var modalListItem = document.createElement("tr");

  // Copy the cells for product name, price, and remove button
  var modalNameCell = nameCell.cloneNode(true);
  var modalPriceCell = priceCell.cloneNode(true);
  var modalRemoveCell = removeCell.cloneNode(true);

  // Append cells to the modal row
  modalListItem.appendChild(modalNameCell);
  modalListItem.appendChild(modalPriceCell);
  modalListItem.appendChild(modalRemoveCell);

  // Append the modal row to the modal cart
  modalCartItems.appendChild(modalListItem);

  // Add event listener to the remove button in the modal
  var modalRemoveButton = modalRemoveCell.querySelector("button");
  modalRemoveButton.addEventListener("click", function() {
    removeFromCart(listItem, itemPrice);
  });

  // Update the total in the main cart
  var currentTotal = parseFloat(totalElement.innerText) || 0;
  var newTotal = currentTotal + itemPrice;
  totalElement.innerText = newTotal.toFixed(2);

  // Update the total in the modal cart
  var modalCurrentTotal = parseFloat(modalTotalElement.innerText) || 0;
  var modalNewTotal = modalCurrentTotal + itemPrice;
  modalTotalElement.innerText = modalNewTotal.toFixed(2);
}



// Function to remove an item from the cart
function removeFromCart(listItem, itemPrice) {
  var totalElement = document.getElementById("total");
  var modalTotalElement = document.getElementById("modal-total");

  // Update the total in the main cart
  var currentTotal = parseFloat(totalElement.innerText);
  var newTotal = currentTotal - itemPrice;
  totalElement.innerText = newTotal.toFixed(2);

  // Update the total in the modal cart
  var modalCurrentTotal = parseFloat(modalTotalElement.innerText);
  var modalNewTotal = modalCurrentTotal - itemPrice;
  modalTotalElement.innerText = modalNewTotal.toFixed(2);

  // Remove the item from the cart
  var cartItems = document.getElementById("cart-items");
  cartItems.removeChild(listItem);

  // Remove the item from the modal cart
  var modalCartItems = document.getElementById("modal-cart-items");
  var modalItems = modalCartItems.getElementsByTagName("tr");

  for (var i = 0; i < modalItems.length; i++) {
    var modalItem = modalItems[i];
    if (modalItem.isEqualNode(listItem)) {
      modalCartItems.removeChild(modalItem);
      break;
    }
  }
}

// Function to confirm the checkout
function confirmCheckout() {
  // Simulate an alert message
  alert("Thank you for your purchase!");

  // Clear the cart
  var cartItems = document.getElementById("cart-items");
  var modalCartItems = document.getElementById("modal-cart-items");
  var totalElement = document.getElementById("total");

  while (cartItems.firstChild) {
    cartItems.removeChild(cartItems.firstChild);
  }

  while (modalCartItems.firstChild) {
    modalCartItems.removeChild(modalCartItems.firstChild);
  }

  // Reset the total
  totalElement.innerText = "0";

  // Close the modal
  closeModal();
}

// Open the modal
function openModal() {
  modal.style.display = "block";

  // Add event listener to the close button
  var closeButton = document.getElementById("modalClose");
  closeButton.addEventListener("click", closeModal);
}

// Close the modal
function closeModal() {
  modal.style.display = "none";
}
