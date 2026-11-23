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