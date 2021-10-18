// array to store the data
const data = [
  {
    id: 1,
    img_url:
      "https://images.unsplash.com/photo-1616627561839-074385245ff6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGJlZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    price: 40000,
    name: "Twin",
  },
  {
    id: 2,
    img_url:
      "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGJlZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    price: 90000,
    name: "Twin XL",
  },
  {
    id: 3,
    img_url:
      "https://images.unsplash.com/flagged/photo-1556438758-8d49568ce18e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fGJlZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    price: 15000,
    name: "Full",
  },
  {
    id: 4,
    img_url:
      "https://images.unsplash.com/photo-1598928636135-d146006ff4be?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTJ8fGJlZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    price: 15000,
    name: "Queen",
  },
  {
    id: 5,
    img_url:
      "https://images.unsplash.com/photo-1588046130717-0eb0c9a3ba15?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fGJlZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    price: 30000,
    name: "King",
  },
  {
    id: 6,
    img_url:
      "https://images.unsplash.com/photo-1578898887932-dce23a595ad4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGJlZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    price: 50000,
    name: "Cal King",
  },
  {
    id: 7,
    img_url:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8YmVkfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    price: 20000,
    name: "Water Bed",
  },
];
// function to populate the cards
function fillCards(array) {
  array.map((item) => {
    let container = document.getElementById("items");
    let card = document.createElement("div");
    card.classList.add("card");
    let img = document.createElement("IMG");
    img.setAttribute("src", item.img_url);
    let p = document.createElement("p");
    p.innerText = `kSh ${item.price}`;
    let button = document.createElement("BUTTON");
    let inputQ = document.createElement("input");
    inputQ.setAttribute("type", "number");
    inputQ.setAttribute("id", `id${item.id}`);
    inputQ.setAttribute("name", "quantity");
    inputQ.classList.add("quantity");
    inputQ.setAttribute("min", "1");
    inputQ.setAttribute("max", "100");
    inputQ.setAttribute("placeholder", "Quantity");
    button.innerText = "Add to Cart";
    button.setAttribute("id", item.id);
    card.appendChild(img);
    card.appendChild(p);
    card.appendChild(button);
    card.appendChild(inputQ);
    container.appendChild(card);
  });
}

// function  to calculate the total cost
function totalCost(id, quantity, price) {
  let grandTotal = 0;
  let grandTotalWithDisc = 0;
  let discount = 0;
  let result = {
    grandTotal: grandTotal,
    grandTotalWithDisc: grandTotalWithDisc,
    discount: discount,
  };
  if (quantity >= 50) {
    grandTotal = quantity * price;
    discount = Number((quantity * 0.5).toFixed(2));
    grandTotalWithDisc = grandTotal - discount;
    result.grandTotal = grandTotal;
    result.grandTotalWithDisc = grandTotalWithDisc;
    result.discount = discount;
    return result;
  }
  if (quantity >= 25) {
    grandTotal = quantity * price;
    discount = Number((quantity * 0.25).toFixed(2));
    grandTotalWithDisc = grandTotal - discount;
    result.grandTotal = grandTotal;
    result.grandTotalWithDisc = grandTotalWithDisc;
    result.discount = discount;
    return result;
  }
  if (quantity >= 10) {
    grandTotal = quantity * price;
    discount = Number((quantity * 0.1).toFixed(2));
    grandTotalWithDisc = grandTotal - discount;
    result.grandTotal = grandTotal;
    result.grandTotalWithDisc = grandTotalWithDisc;
    result.discount = discount;
    return result;
  }
  grandTotal = quantity * price;
  return result;
}

// run these functions everytime we load the page
const itemsInCart = {};

document.getElementById("items").addEventListener("click", handleCart);

// ----------function to handle the click event on add to cart button----------------
const added = [];

function handleCart(e) {
  // e.target.disabled = true;
  if (itemsInCart[e.target.id]) {
    // itemsInCart[e.target.id]++;
    alert("You already added this item to cart");
    return;
  } else {
    itemsInCart[e.target.id] = 1;
  }
  document.getElementById("items-count").innerText = Object.keys(
    itemsInCart
  ).length;
  // console.log(itemsInCart);
  const cartData = Object.keys(itemsInCart).map((elem) => {
    return data.filter((item) => item.id == elem);
  });
  const container = document.getElementById("cart__row__con");
  cartData.map((data) => {
    if (added.some((item) => item == data[0].id)) return;
    let total = data[0].price;
    // console.log(added);
    container.innerHTML += `<div class="cart__row">
  <div class="cart__item cart__column">
    <img
      class="cart__item__image"
      src=${data[0].img_url}
      width="100"
      height="100"
    />
    <span class="cart__item__title">${data[0].name}</span>
  </div>
  <span class="cart__price cart__column">${data[0].price}</span>
  <span class="cart__quantity cart__column"
    ><input class="cart-quantity-input" type="number" value="1" id="input" onchange="changeHandler(this.value, ${data[0].price}, ${total}, ${data[0].id})"
  /></span>
  <span class="cart__total cart__column" id=total${data[0].id}>${total}</span>
  <span class="cart__discount cart__column" id=disc${data[0].id}></span>
  <span class="cart__totalWdiscount withDisc cart__column" id=totalWithDisc${data[0].id}>${data[0].price}</span>
</div>`;
    // let id = data[0].id;
    // let price = 0;
    // let quantity = 1;

    // console.log(quantity);
    added.push(data[0].id);
    // totalCost(id, quantity, price);

    // console.log(cartData);
    // Add cart items here
  });
  // console.log(document.getElementById("cart__row__con"));
  // console.log(
  //   [document.getElementsByClassName("withDisc")].map((elem) => elem.innerText)
  // );
  getGrandTotal();
}

// function to remove event listeer from the clicked button
// function removerListener() {
//   document.getElementById("items").removeEventListener("click", handleCart);
// }

// function to handle input

fillCards(data);

function changeHandler(q, price, total, id) {
  total = q * price;
  document.getElementById(`total${id}`).innerText = total;
  if (q >= 50) {
    totalWithDisc = total - (q * 0.5).toFixed(2);
    document.getElementById(`disc${id}`).innerText = (q * 0.5).toFixed(2);
    document.getElementById(`totalWithDisc${id}`).innerText = totalWithDisc;
  }
  if (q >= 25) {
    totalWithDisc = total - (q * 0.25).toFixed(2);
    document.getElementById(`disc${id}`).innerText = (q * 0.25).toFixed(2);
    document.getElementById(`totalWithDisc${id}`).innerText = totalWithDisc;
  }
  if (q >= 10) {
    totalWithDisc = total - (q * 0.1).toFixed(2);
    document.getElementById(`disc${id}`).innerText = (q * 0.1).toFixed(2);
    document.getElementById(`totalWithDisc${id}`).innerText = totalWithDisc;
  }

  // alert(total);
  getGrandTotal();
}

// function to get grandTotal
function getGrandTotal() {
  let grandTotal = 0;
  for (let i = 0; i < Object.keys(itemsInCart).length; i++) {
    grandTotal += Number(
      document.getElementsByClassName("withDisc")[i].innerText
    );
    document.getElementById("grandTotal").innerText = grandTotal.toFixed(2);
  }
}

let myIndex = 0;
carousel();

function carousel() {
  let i;
  let x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  myIndex++;
  if (myIndex > x.length) {
    myIndex = 1;
  }
  x[myIndex - 1].style.display = "block";
  setTimeout(carousel, 5000); // Change image every 2 seconds
}

// modal
const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");

openModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);
    // getGrandTotal();
  });
});

overlay.addEventListener("click", () => {
  const modals = document.querySelectorAll(".modal.active");
  modals.forEach((modal) => {
    closeModal(modal);
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}
