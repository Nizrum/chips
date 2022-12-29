const darkModeBtn = document.querySelector(".header__dark-mode-button");
const darkModeIcon = darkModeBtn.querySelector("img");
const body = document.querySelector("body");
const search = document.querySelector(".search");
const cartBtn = document.querySelector(".header__cart-button");
const mainTitle = document.querySelector(".main__title");
const ingredientTexts = document.querySelectorAll(".ingredient__text");
const productTexts = document.querySelectorAll(".product__text");
const amountCounter = document.querySelector(".amount-counter");
const addButton = document.querySelector(".add-to-cart-button");
const cart = document.querySelector(".cart");

function toggleMode() {
    darkModeIcon.src = `images/${darkModeIcon.src.includes("dark") ? "light" : "dark"}-mode.svg`;
    body.classList.toggle("dark-mode");
    mainTitle.classList.toggle("main__title_dark-mode");
    search.classList.toggle("search_dark-mode");
    cartBtn.classList.toggle("header__cart-button_dark-mode");
    amountCounter.classList.toggle("amount-counter_dark-mode");
    addButton.classList.toggle("add-to-cart-button_dark-mode");
    cart.classList.toggle("cart_dark-mode");
    ingredientTexts.forEach((item) => {
        item.classList.toggle("ingredient__text_dark-mode");
    });
    productTexts.forEach((item) => {
        item.classList.toggle("product__text_dark-mode");
    });
}

darkModeBtn.addEventListener("click", function () {
    toggleMode();
    localStorage.setItem('darkmode', localStorage.getItem('darkmode') == 'dark' ? 'light' : 'dark');
});

if (!localStorage.getItem('darkmode')) {
    localStorage.setItem('darkmode', 'light');
}

if (localStorage.getItem('darkmode') == 'dark') {
    toggleMode();
}