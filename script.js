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
    button.innerText = "Add to Cart";
    button.setAttribute("id", item.id);
    card.appendChild(img);
    card.appendChild(p);
    card.appendChild(button);
    container.appendChild(card);
  });
}

let itemsInCart = {}; // An object to store the items that are currently selected to cart
const added = []; //We store the ids of the items selected. We use this to ensure that the item is not selected twice

// event listen to listen add to cart button-click
document.getElementById("items").addEventListener("click", handleCart);

// ----------This function runs after add to cart button is clicked----------------
function handleCart(e) {
  let items = Object.keys(itemsInCart).length;
  if (e.target.id === "items") return;
  if (itemsInCart[e.target.id]) {
    alert("You already added this item to cart");
    return;
  } else {
    itemsInCart[e.target.id] = 1;
  }
  document.getElementById("items-count").innerText = Object.keys(
    itemsInCart
  ).length;

  const cartData = Object.keys(itemsInCart).map((elem) => {
    return data.filter((item) => item.id == elem);
  });
  // console.log(cartData);
  const container = document.getElementById("cart__row__con");
  cartData.map((data) => {
    if (added.some((item) => item == data[0].id)) return; //if item has already been placed in the modal, then dont repeat it
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
  <button class="remove" data-remove>&times;</button>
</div>`;

    added.push(data[0].id);
  });

  getGrandTotal(); //Get total again after adding a new item to the DOM
  const selectedRemove = document.querySelectorAll("[data-remove]"); //Target the remove button in the DOM
  for (let i = 0; i < selectedRemove.length; i++) {
    const button = selectedRemove[i];
    button.addEventListener("click", removeItem); //listen for click event then run the removeItem function
  }
}
// ------------we run this function everytime the page loads------------//
fillCards(data);

// --------------function to run if there is a change inthe qunatity of individual items
function changeHandler(q, price, total, id) {
  total = q * price;

  if (q >= 50) {
    totalWithDisc = total - (q * 50).toFixed(2);
    document.getElementById(`disc${id}`).innerText = (q * 50).toFixed(2);
    document.getElementById(`total${id}`).innerText = total;
    document.getElementById(`totalWithDisc${id}`).innerText = totalWithDisc;
    getGrandTotal();
    return;
  }
  if (q >= 25) {
    totalWithDisc = total - (q * 25).toFixed(2);
    document.getElementById(`disc${id}`).innerText = (q * 25).toFixed(2);
    document.getElementById(`total${id}`).innerText = total;
    document.getElementById(`totalWithDisc${id}`).innerText = totalWithDisc;
    getGrandTotal();
    return;
  }
  if (q >= 10) {
    totalWithDisc = total - (q * 10).toFixed(2);
    document.getElementById(`disc${id}`).innerText = (q * 10).toFixed(2);
    document.getElementById(`total${id}`).innerText = total;
    document.getElementById(`totalWithDisc${id}`).innerText = totalWithDisc;
    getGrandTotal();
    return;
  }
  document.getElementById(`totalWithDisc${id}`).innerText = total;
  document.getElementById(`total${id}`).innerText = total;
  getGrandTotal();
  // alert(total);
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

// function to remove an item element from the modal
function removeItem(e) {
  let buttonClicked = e.target;

  buttonClicked.parentElement.remove();
  document.getElementById("items-count").innerText--;
  if (document.getElementById("items-count").innerText == 0) {
    itemsInCart = {};
    document.getElementById("grandTotal").innerText = 0;
    return;
  }
  getGrandTotal();
}

// --------------------carousel---------------------------
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" activeDots", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " activeDots";
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

//
