// Load customers from localStorage with default fallback
let customers = JSON.parse(localStorage.getItem("pos_customers")) || [
    { id: "C001", name: "Kasun Perera", phone: "0771234567", email: "kasun@email.com"}
];

// Render customers table on DOM content loaded
document.addEventListener("DOMContentLoaded", renderCustomers);

// Add new customer on form submit and save to localStorage
document.getElementById("customer-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("cust-name").value;
    const phone = document.getElementById("cust-phone").value;
    const email = document.getElementById("cust-email").value || "-";

    const newCustomer = {
        id: "C00" + (customers.length + 1),
        name,
        phone,
        email 
    };

    customers.push(newCustomer);
    localStorage.getItem("pos_customers", JSON.stringify(customers));
    renderCustomers();
    e.target.reset();
});