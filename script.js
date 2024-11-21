
const url = "https://fakestoreapi.com/products";
let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("products-container")) {
        fetchProducts();
    }

    if (document.getElementById("cartItem")) {
        displayCartItems();
    }
    updateCartCount(); 
});

function fetchProducts() {
    fetch(url)
        .then(response => response.json())
        .then(products => {
            const productsContainer = document.getElementById("products-container");
            const productTemplate = document.getElementById("products-item-template").content;

            products.forEach(product => {
                const productClone = productTemplate.cloneNode(true);

                productClone.querySelector(".product-title").textContent = product.title;
                productClone.querySelector(".product-image").src = product.image;
                productClone.querySelector(".product-image").alt = product.title;
                productClone.querySelector(".product-description").textContent = product.description;
                productClone.querySelector(".product-price").textContent = `Price: $${product.price}`;

                productClone.querySelector(".addToCart").onclick = () => addToCart({
                    id: product.id,
                    name: product.title,
                    img: product.image,
                    price: product.price,
                });

                productsContainer.appendChild(productClone);
            });
        })
        .catch(error => console.error("Error fetching products:", error));
}

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        alert("Product is already added to the cart");
    } else {
        cart.push({ ...product, quantity: 1 });
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCartItems();
        updateCartCount();
        alert("Product added to cart!");
    }
}

function displayCartItems() {
    const cartItem = document.getElementById("cartItem");
    if (!cartItem) {
        console.error("Cart item container not found.");
        return;
    }
    cartItem.innerHTML = "";

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;

        const row = document.createElement("tr");

        const sNoCell = document.createElement("td");
        sNoCell.textContent = index + 1;
        row.appendChild(sNoCell);

        const nameCell = document.createElement("td");
        nameCell.textContent = item.name;
        row.appendChild(nameCell);

        const imgCell = document.createElement("td");
        const img = document.createElement("img");
        img.src = item.img;
        img.alt = item.name;
        img.width = 50;
        imgCell.appendChild(img);
        row.appendChild(imgCell);

        const priceCell = document.createElement("td");
        priceCell.textContent = `$${item.price.toFixed(2)}`;
        row.appendChild(priceCell);

        const qtyCell = document.createElement("td");
        const minusButton = document.createElement("button");
        minusButton.textContent = "-";
        minusButton.onclick = () => changeQuantity(index, -1);
        qtyCell.appendChild(minusButton);

        const qtyText = document.createElement("span");
        qtyText.textContent = ` ${item.quantity} `;
        qtyCell.appendChild(qtyText);

        const plusButton = document.createElement("button");
        plusButton.textContent = "+";
        plusButton.onclick = () => changeQuantity(index, 1);
        qtyCell.appendChild(plusButton);
        row.appendChild(qtyCell);

        const totalCell = document.createElement("td");
        totalCell.textContent = `$${itemTotal.toFixed(2)}`;
        row.appendChild(totalCell);

        const removeCell = document.createElement("td");
        const removeButton = document.createElement("button");
        removeButton.textContent = "🗑️";
        removeButton.onclick = () => removeFromCart(index);
        removeCell.appendChild(removeButton);
        row.appendChild(removeCell);

        cartItem.appendChild(row);
    });
}

function changeQuantity(index, delta) {
    cart[index].quantity += delta;
    if (cart[index].quantity < 1) cart[index].quantity = 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems(); 
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
    updateCartCount(); 
}

function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    const uniqueItemCount = cart.length; 
    cartCount.textContent = uniqueItemCount;
}
