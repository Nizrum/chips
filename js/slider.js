const moreButton = document.querySelector(".other__button");

moreButton.addEventListener("click", () => {
    let products = Array.from(document.querySelectorAll(".other__product"));
    products = products.slice(1).concat(products[0]);

    productsList.innerHTML = "";
    for (let product of products) {
        productsList.appendChild(product);
    }
});
