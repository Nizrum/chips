const searchInput = document.querySelector(".search__input");
const searchList = document.querySelector(".search__list");
const searchBtn = document.querySelector(".search__button");

searchInput.addEventListener("input", () => {
    const allProducts = JSON.parse(localStorage.getItem("allProducts"));
    searchList.innerHTML = "";
    if (searchInput.value !== "") {
        for (let product of allProducts.filter((p) => p.name.toLowerCase().includes(searchInput.value.toLowerCase()))) {
            searchList.innerHTML += `
                <li class="search__item" data-id="${product.id}">${product.name}</li>            
            `;
        }
    }
});

searchList.addEventListener("click", (event) => {
    renderProduct(event.target.dataset.id);
    searchList.innerHTML = "";
    searchInput.value = "";
    searchInput.classList.toggle('search__input_visible');
});

searchBtn.addEventListener("click", () => {
    searchInput.classList.toggle('search__input_visible');
});
