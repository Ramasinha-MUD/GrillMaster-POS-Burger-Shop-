let cart = [];
let currentCategory = "All";

// Things that run when the page loads
document.addEventListener("DOMContentLoaded", () => {
    renderMenu(menuItems);
    loadCustomerDropdown();
    updateClock();
    setInterval(updateClock, 1000);
});

// Live Clock
function updateClock() {
    const now = new Date();
    document.getElementById("live-clock").innerText = now.toLocaleTimeString();
}

// Display menu items on the screen
function renderMenu(items) {
    const grid = document.getElementById("menu-grid");
    grid.innerHTML = "";

    items.forEach(item => {
        const card = document.createElement("div");
        card.className = "food-card";
        card.onclick = () => addToCart(item);
        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="food-img">
            <h4>${item.name}</h4>
            <p>Rs. ${item.price.toFixed(2)}</p>
        `;
        grid.appendChild(card);
    });
}

// Filter by Category
function filterCategory(category) {
    currentCategory = category;
    document.querySelectorAll(".cat.btn").forEach(btn => {
        btn.classList.toggle("active", btn.innerText.includes(category)|| (category === 'All' && btn.innerText === 'All'));
    });

    const filtered = category === "All"
        ? menuItems
        : menuItems.filter(item => item.category === category);
    renderMenu(filtered);
}

// Search from the search bar
document.getElementById("search-input").addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = menuItems.filter(item => item.name.toLowerCase().includes(term));
    renderMenu(filtered);
});

// Adding an item to the cart
function addToCart(item) {
    const existing = cart.find(c => c.id === item.id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...item, qty: 1});
    }
    renderCart();
}

// Update to the Cart
function renderCart() {
    const cartContainer = document.getElementById("cart-items");
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = `<p class="empty-msg">Cart is empty. Select items to start.</p>`;
        updateTotals();
        return;
    }

    cart.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
            <div>
                <strong>${item.name}</strong><br>
                <small>Rs. ${item.price} x ${item.qty}</small>
            </div>
            <div class="qty-controls">
                <button onclick="changeQty(${index}, -1)">-</button>
                <span> ${item.qty} </span>
                <button onclick="changeQty(${index}, 1)">+</button>
            </div>
        `;
        cartContainer.appendChild(div);
    });

    updateTotals();
}

// Increase or decrease quantity
function changeQty(index, delta) {
    cart[index].qty += delta;
    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }
    renderCart();
}