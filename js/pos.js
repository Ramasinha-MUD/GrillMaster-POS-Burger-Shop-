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

