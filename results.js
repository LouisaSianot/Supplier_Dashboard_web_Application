// results.js - Fixed and cleaned up version

const deliveryFee = 100;

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Check if we have quote data from sessionStorage
    const quoteData = JSON.parse(sessionStorage.getItem('quoteResults'));
    
    if (quoteData) {
        // We have data from the quotation page - display it
        displayQuoteResults(quoteData);
    } else {
        // No data from quotation page - load sample data from CSV
        loadCSV();
    }
});

// Display quote results from quotation page
function displayQuoteResults(quoteData) {
    // Update the page title to show it's a generated quote
    document.querySelector('.page-title').textContent = 'Your Quotation';
    
    // Display the items table
    const tbody = document.getElementById('selectedItems');
    tbody.innerHTML = '';
    
    quoteData.items.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.description}</td>
            <td>${item.supplier}</td>
            <td>K${item.price.toFixed(2)}</td>
            <td>${item.quantity} ${item.unit}</td>
            <td>K${(item.price * item.quantity).toFixed(2)}</td>
        `;
        tbody.appendChild(row);
    });
    
    // Update the cost summary
    document.getElementById('subtotal').textContent = `K${quoteData.subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `K${quoteData.tax.toFixed(2)}`;
    document.getElementById('delivery').textContent = `K${quoteData.delivery.toFixed(2)}`;
    document.getElementById('total').textContent = `K${quoteData.total.toFixed(2)}`;
    
    // Add generated date
    const existingDate = document.querySelector('.generated-date');
    if (!existingDate) {
        const dateElement = document.createElement('p');
        dateElement.className = 'generated-date';
        dateElement.textContent = `Generated: ${quoteData.generatedAt}`;
        document.querySelector('.section-title').after(dateElement);
    }
}

// Load sample CSV data when no quote data exists
async function loadCSV() {
    try {
        const response = await fetch("quotes.csv");
        const csvText = await response.text();

        const rows = csvText.split("\n").map(r => r.split(","));
        const dataRows = rows.slice(1).filter(r => r.length > 1);

        const items = dataRows.slice(0, 5).map(row => ({
            supplier: row[0],
            productCode: row[1],
            description: row[2],
            uom: row[3],
            price: parseFloat(row[4]) || 0,
            quantity: 1
        }));

        renderSampleItems(items);
        updateSummary(items);
    } catch (error) {
        console.error('Error loading CSV:', error);
        // Show placeholder data if CSV can't be loaded
        showPlaceholderData();
    }
}

// Render sample items from CSV
function renderSampleItems(items) {
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

    // Add event listeners for interactive elements
    addInteractiveListeners(items);
}

// Add event listeners for quantity changes and remove buttons
function addInteractiveListeners(items) {
    // Quantity change listeners
    document.querySelectorAll(".quantity-input").forEach(input => {
        input.addEventListener("input", e => {
            const idx = parseInt(e.target.getAttribute("data-index"));
            const newQty = parseInt(e.target.value) || 1;
            items[idx].quantity = newQty;
            document.getElementById(`total-${idx}`).textContent = 
                `K${(items[idx].price * newQty).toFixed(2)}`;
            updateSummary(items);
        });
    });

    // Remove button listeners
    document.querySelectorAll(".remove-btn").forEach(btn => {
        btn.addEventListener("click", e => {
            const idx = parseInt(e.target.getAttribute("data-index"));
            items.splice(idx, 1);
            renderSampleItems(items);
            updateSummary(items);
        });
    });
}

// Update cost summary
function updateSummary(items) {
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

// Show placeholder data when CSV loading fails
function showPlaceholderData() {
    const tbody = document.getElementById("selectedItems");
    tbody.innerHTML = `
        <tr>
            <td><div class="placeholder-cell"></div></td>
            <td><div class="placeholder-cell"></div></td>
            <td><div class="placeholder-cell"></div></td>
            <td><div class="placeholder-cell"></div></td>
            <td><div class="placeholder-cell"></div></td>
        </tr>
        <tr>
            <td><div class="placeholder-cell"></div></td>
            <td><div class="placeholder-cell"></div></td>
            <td><div class="placeholder-cell"></div></td>
            <td><div class="placeholder-cell"></div></td>
            <td><div class="placeholder-cell"></div></td>
        </tr>
        <tr>
            <td><div class="placeholder-cell"></div></td>
            <td><div class="placeholder-cell"></div></td>
            <td><div class="placeholder-cell"></div></td>
            <td><div class="placeholder-cell"></div></td>
            <td><div class="placeholder-cell"></div></td>
        </tr>
    `;
}

// Export functions
function exportPDF() {
    window.print();
}

function generateShareableLink() {
    const quoteData = JSON.parse(sessionStorage.getItem('quoteResults'));
    let link;
    
    if (quoteData) {
        // Generate a more meaningful link for custom quotes
        const timestamp = new Date().getTime();
        link = `${window.location.href}?quote=${timestamp}`;
    } else {
        link = `${window.location.href}?sample=true`;
    }
    
    navigator.clipboard.writeText(link).then(() => {
        alert("Shareable link copied to clipboard:\n" + link);
    }).catch(() => {
        // Fallback if clipboard API fails
        prompt("Copy this link:", link);
    });
}

function printQuote() {
    window.print();
}