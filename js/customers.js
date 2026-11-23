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

// Render customer rows dynamically into table body
function renderCustomers() {
    const tbody = document.getElementById("customer-table-body");
    tbody.innerHTML = "";

    customers.forEach((c, index) => {
        const row = `
            <tr>
                <td>${c.id}</td>
                <td>${c.name}</td>
                <td>${c.phone}</td>
                <td>${c.email}</td>
                <td><button class="clear-btn" onclick="deleteCustomer(${index})">Delete</button></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Delete customer by index and update localStorage
function deleteCustomer(index) {
    customers.splice(index, 1);
    localStorage.setItem("pos_customers", JSON.stringify(customers));
    renderCustomers();
}