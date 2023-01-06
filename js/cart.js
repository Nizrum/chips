const body = document.querySelector("body");
const cartBtn = document.querySelector(".header__cart-button");
const cart = document.querySelector(".cart");
const closeBtn = document.querySelector(".cart__close-button");
const cartOverlay = document.querySelector(".cart__overlay");
const cartList = document.querySelector(".cart__table tbody");
const cartForm = document.querySelector(".cart__form");
const cartInputName = document.querySelector(".cart__input_name");
const cartInputPhone = document.querySelector(".cart__input_phone");
const minusBtn = document.querySelector(".change-amount-button_minus");
const plusBtn = document.querySelector(".change-amount-button_plus");
const amountCounter = document.querySelector(".amount-counter__inner");
let counter = 1;

const addProduct = (id, amount) => {
    let cartArr = JSON.parse(localStorage.getItem("cartProducts")) || [];
    let clickedProduct = JSON.parse(localStorage.getItem("allProducts")).find((p) => p["id"] == id);
    if (cartArr.some((p) => p["id"] == clickedProduct["id"])) {
        cartArr.map((p) => {
            if (p["id"] == clickedProduct["id"]) {
                p.count += amount;
            }
        });
    } else {
        clickedProduct.count = amount;
        cartArr.push(clickedProduct);
    }
    localStorage.setItem("cartProducts", JSON.stringify(cartArr));
    counter = 1;
    amountCounter.textContent = counter;
    renderCart();
};

const removeProduct = (id) => {
    let cartArr = JSON.parse(localStorage.getItem("cartProducts"));
    cartArr = cartArr.filter((p) => p["id"] != id);
    localStorage.setItem("cartProducts", JSON.stringify(cartArr));
    renderCart();
};

const renderCart = () => {
    let cartArr = JSON.parse(localStorage.getItem("cartProducts")) || [];
    cartList.innerHTML = "";
    let total = 0;
    for (let product of cartArr) {
        cartList.innerHTML += `
                <tr class="cart__product" data-id="${product.id}">
                    <td>${product.name}</td>
                    <td>₹${product.price}</td>
                    <td>${product.count}</td>
                    <td>₹${product.price * product.count}</td>
                    <td>
                        <button class="cart__remove-button">✕</button>
                    </td>
                </tr>
            `;
        total += product.price * product.count;
    }
    cartList.innerHTML += `
            <tr class="cart__total">
                <td colspan="3">Total</td>
                <td>₹${total}</td>
            </tr>
        `;
};

const sendForm = () => {
    let cartArr = JSON.parse(localStorage.getItem("cartProducts"));

    if (cartArr.length && cartInputName.value.length && cartInputPhone.value.length) {
        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            body: JSON.stringify({
                cart: cartArr,
                name: cartInputName.value,
                phone: cartInputPhone.value,
            }),
        }).then(() => {
            cartInputName.value = "";
            cartInputPhone.value = "";
            localStorage.setItem("cartProducts", JSON.stringify([]));
            renderCart();
        });
    }
};

cartBtn.addEventListener("click", () => {
    body.classList.toggle("no-scroll");
    cart.classList.toggle("cart_active");
});

closeBtn.addEventListener("click", () => {
    body.classList.toggle("no-scroll");
    cart.classList.toggle("cart_active");
});

cartOverlay.addEventListener("click", () => {
    body.classList.toggle("no-scroll");
    cart.classList.toggle("cart_active");
});

minusBtn.addEventListener("click", () => {
    if (counter > 1) {
        counter--;
        amountCounter.textContent = counter;
    }
});

plusBtn.addEventListener("click", () => {
    if (counter < 99) {
        counter++;
        amountCounter.textContent = counter;
    }
});

addBtn.addEventListener("click", () => {
    addProduct(addBtn.dataset.id, counter);
});

cartList.addEventListener("click", (event) => {
    if (event.target.classList.contains("cart__remove-button")) {
        removeProduct(event.target.closest(".cart__product").dataset.id);
    }
});

cartForm.addEventListener("submit", (event) => {
    event.preventDefault();
    sendForm();
});

renderCart();
