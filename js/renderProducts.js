(function () {
    const title = document.querySelector(".main__title");
    const subtitle = document.querySelector(".main__subtitle");
    const addBtn = document.querySelector(".add-to-cart-button");
    const image = document.querySelector(".main__image");
    const ingredients = document.querySelector(".main__ingredients");
    const productsList = document.querySelector(".other__list");

    const renderProduct = (id) => {
        let productsArr = JSON.parse(localStorage.getItem("allProducts"));
        let currentProduct = productsArr.filter((p) => p["id"] == id)[0];
        let modeClass = localStorage.getItem("darkmode") == 'dark' ? 'product__text_dark-mode' : '';
        title.textContent = currentProduct["name"];
        subtitle.textContent = currentProduct["description"];
        addBtn.dataset.id = currentProduct["id"];
        image.src = currentProduct["img"];
        productsList.innerHTML = "";
        for (let product of productsArr.filter((p) => p["id"] != id)) {
            productsList.innerHTML += `
                <div class="other__product product">
                    <img src="${product["img"]}" alt="a pack of chips" class="product__image">
                    <div class="product__text ${modeClass}">
                        <h3 class="product__name">${product["name"]}</h3>
                        <p class="product__price">₹${product["price"]}</p>
                        <button class="product__button" data-id="${product["id"]}">View</button>
                    </div>
                </div>
            `;
        }
        ingredients.innerHTML = "";
        for (let ingredient of currentProduct["ingredients"]) {
            ingredients.innerHTML += `
                <div class="main__ingredient ingredient">
                    <span class="ingredient__text ${
                        localStorage.getItem("darkmode") == "dark" ? "ingredient__text_dark-mode" : ""
                    }">${ingredient}</span>
                    <div class="ingredient__image ingredient__image_${ingredient}">
                        <img src="images/${ingredient}.png" alt="ingredient image" class="ingredient__img">
                    </div>
                </div>
            `;
        }
    };

    fetch("https://chips-73f39-default-rtdb.firebaseio.com/db.json")
        .then((response) => {
            return response.text();
        })
        .then((response) => {
            localStorage.setItem("allProducts", response);
            renderProduct("001");
        });

    productsList.addEventListener("click", (event) => {
        if (event.target.classList.contains("product__button")) {
            renderProduct(event.target.dataset.id);
        }
    });
})();
