const darkModeBtn = document.querySelector(".header__dark-mode-button");
const darkModeIcon = darkModeBtn.querySelector("img");
const search = document.querySelector(".search");
const mainTitle = document.querySelector(".main__title");
const addButton = document.querySelector(".add-to-cart-button");

function toggleMode() {
    darkModeIcon.src = `images/${darkModeIcon.src.includes("dark") ? "light" : "dark"}-mode.svg`;
    body.classList.toggle("dark-mode");
    mainTitle.classList.toggle("main__title_dark-mode");
    search.classList.toggle("search_dark-mode");
    cartBtn.classList.toggle("header__cart-button_dark-mode");
    amountCounter.classList.toggle("amount-counter_dark-mode");
    addButton.classList.toggle("add-to-cart-button_dark-mode");
    cart.classList.toggle("cart_dark-mode");
    document.querySelectorAll(".ingredient__text").forEach((item) => {
        item.classList.toggle("ingredient__text_dark-mode");
    });
    document.querySelectorAll(".product__text").forEach((item) => {
        item.classList.toggle("product__text_dark-mode");
    });
}

darkModeBtn.addEventListener("click", function () {
    toggleMode();
    localStorage.setItem("darkmode", localStorage.getItem("darkmode") == "dark" ? "light" : "dark");
});

if (!localStorage.getItem("darkmode")) {
    localStorage.setItem("darkmode", "light");
}

if (localStorage.getItem("darkmode") == "dark") {
    toggleMode();
}
