// Load customers from localStorage with default fallback
let customers = JSON.parse(localStorage.getItem("pos_customers")) || [
    { id: "C001", name: "Kasun Perera", phone: "0771234567", email: "kasun@email.com"}
];