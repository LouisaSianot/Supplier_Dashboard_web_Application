// supplier-dashboard.js - Supplier Dashboard Functionality

// DOM Elements
const requestsList = document.getElementById('requestsList');
const productsList = document.getElementById('productsList');
const productForm = document.getElementById('productForm');
const loginModal = document.getElementById('loginModal');
const modalLoginForm = document.getElementById('modalLoginForm');

// Sample data for demonstration
let products = [
    { id: 1, name: "Concrete Blocks", price: 2.50, stock: 500 },
    { id: 2, name: "Steel Beams", price: 15.75, stock: 200 },
    { id: 3, name: "Roof Tiles", price: 3.20, stock: 350 }
];

let requests = [
    { id: 1001, customer: "John Smith", material: "Concrete Blocks", quantity: 150, status: "Pending" },
    { id: 1002, customer: "Emma Johnson", material: "Steel Beams", quantity: 30, status: "Quoted" },
    { id: 1003, customer: "Michael Brown", material: "Roof Tiles", quantity: 200, status: "Completed" }
];

let selectedProductId = null;

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', function() {
    renderRequests();
    renderProducts();
    
    // Check if user is logged in (simulated)
    const isLoggedIn = sessionStorage.getItem('supplierLoggedIn');
    if (!isLoggedIn) {
        loginModal.style.display = 'flex';
    }
});

// Request Functions
function viewRequests() {
    // In a real app, this would fetch requests from an API
    console.log("Viewing all requests");
    renderRequests();
}

function renderRequests() {
    requestsList.innerHTML = '';
    
    requests.forEach(request => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${request.id}</td>
            <td>${request.customer}</td>
            <td>${request.material}</td>
            <td>${request.quantity}</td>
            <td>${request.status}</td>
        `;
        requestsList.appendChild(row);
    });
}

// Product Functions
function handleProductSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('productName').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const stock = parseInt(document.getElementById('productStock').value);
    
    if (selectedProductId) {
        // Update existing product
        const productIndex = products.findIndex(p => p.id === selectedProductId);
        if (productIndex !== -1) {
            products[productIndex] = { 
                id: selectedProductId, 
                name, 
                price, 
                stock 
            };
        }
        selectedProductId = null;
    } else {
        // Add new product
        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        products.push({ id: newId, name, price, stock });
    }
    
    productForm.reset();
    renderProducts();
}

function updateProduct() {
    const name = document.getElementById('productName').value;
    if (!name) {
        alert("Please select a product to update first");
        return;
    }
    
    // In a real app, this would be handled by the form submission
    console.log("Updating product:", selectedProductId);
}

function deleteProduct() {
    if (!selectedProductId) {
        alert("Please select a product to delete first");
        return;
    }
    
    if (confirm("Are you sure you want to delete this product?")) {
        products = products.filter(p => p.id !== selectedProductId);
        selectedProductId = null;
        productForm.reset();
        renderProducts();
    }
}

function viewProducts() {
    // In a real app, this might fetch fresh data from an API
    console.log("Viewing all products");
    renderProducts();
}

function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        document.getElementById('productName').value = product.name;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productStock').value = product.stock;
        selectedProductId = product.id;
    }
}

function removeProduct(productId) {
    if (confirm("Are you sure you want to delete this product?")) {
        products = products.filter(p => p.id !== productId);
        renderProducts();
    }
}

function renderProducts() {
    productsList.innerHTML = '';
    
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>${product.stock}</td>
            <td>
                <button class="edit-button" onclick="editProduct(${product.id})">Edit</button>
                <button class="delete-button" onclick="removeProduct(${product.id})">Delete</button>
            </td>
        `;
        productsList.appendChild(row);
    });
}

// Modal Functions
function handleModalLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('modalEmail').value;
    const password = document.getElementById('modalPassword').value;
    
    // In a real app, this would validate with a backend
    console.log("Login attempt with:", email, password);
    
    // Simulate successful login
    sessionStorage.setItem('supplierLoggedIn', 'true');
    loginModal.style.display = 'none';
    modalLoginForm.reset();
}

function closeModal() {
    loginModal.style.display = 'none';
}

function forgotPassword() {
    alert("Password reset link would be sent to your email in a real application");
}

function signUp() {
    alert("Would redirect to supplier registration page in a real application");
}

// Navigation Functions
function manageQuotations() {
    alert("Would navigate to quotation management page in a real application");
}