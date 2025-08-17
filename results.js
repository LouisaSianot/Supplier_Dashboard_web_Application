// results.js

const deliveryFee = 100;
let items = []; // will store loaded items

// Load CSV dynamically
async function loadCSV() {
    const response = await fetch("quotes.csv"); // ensure quotes.csv is in same folder
    const csvText = await response.text();

    const rows = csvText.split("\n").map(r => r.split(","));
    const dataRows = rows.slice(1).filter(r => r.length > 1);

    items = dataRows.map(row => ({
        supplier: row[0],
        productCode: row[1],
        description: row[2],
        uom: row[3],
        price: parseFloat(row[4]) || 0,
        quantity: 1
    }));

    renderTable();
    updateSummary();
}

// Render the items into the table
function renderTable() {
    const tbody = document.getElementById("selectedItems");
    tbody.innerHTML = "";

    items.forEach((item, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.description}</td>
            <td>${item.supplier}</td>
            <td>K${item.price.toFixed(2)}</td>
            <td>
                <input type="number" 
                       min="1" 
                       value="${item.quantity}" 
                       data-index="${index}" 
                       class="quantity-input" 
                       style="width: 60px; padding: 4px;">
            </td>
            <td id="total-${index}">K${(item.price * item.quantity).toFixed(2)}</td>
            <td>
                <button class="remove-btn" data-index="${index}" 
                        style="background:#dc3545; color:white; border:none; padding:4px 8px; border-radius:4px; cursor:pointer;">
                    Remove
                </button>
            </td>
        `;

        tbody.appendChild(row);
    });

    // Quantity change listeners
    document.querySelectorAll(".quantity-input").forEach(input => {
        input.addEventListener("input", e => {
            const idx = parseInt(e.target.getAttribute("data-index"));
            const newQty = parseInt(e.target.value) || 1;
            items[idx].quantity = newQty;
            document.getElementById(`total-${idx}`).textContent = 
                `K${(items[idx].price * newQty).toFixed(2)}`;
            updateSummary();
        });
    });

    // Remove button listeners
    document.querySelectorAll(".remove-btn").forEach(btn => {
        btn.addEventListener("click", e => {
            const idx = parseInt(e.target.getAttribute("data-index"));
            items.splice(idx, 1); // remove item
            renderTable();        // re-render table
            updateSummary();      // update totals
        });
    });
}

// Update subtotal, tax, delivery, total
function updateSummary() {
    let subtotal = 0;

    items.forEach(item => {
        subtotal += item.price * item.quantity;
    });

    const tax = subtotal * 0.1;
    const grandTotal = subtotal + tax + deliveryFee;

    document.getElementById("subtotal").textContent = `K${subtotal.toFixed(2)}`;
    document.getElementById("tax").textContent = `K${tax.toFixed(2)}`;
    document.getElementById("delivery").textContent = `K${deliveryFee.toFixed(2)}`;
    document.getElementById("total").textContent = `K${grandTotal.toFixed(2)}`;
}

// Export PDF (browser print)
function exportPDF() {
    window.print();
}

// Generate shareable link (basic simulation)
function generateShareableLink() {
    const link = `${window.location.href}?quoteId=12345`;
    navigator.clipboard.writeText(link).then(() => {
        alert("Shareable link copied to clipboard:\n" + link);
    });
}

// Print Quote
function printQuote() {
    window.print();
}

// Run
document.addEventListener("DOMContentLoaded", loadCSV);
