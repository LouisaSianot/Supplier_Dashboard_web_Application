// quotation.js - Quotation Page JavaScript

// Sample data from the CSV file
const materialsDatabase = [
    {
        supplier: "Badili Hardware",
        productCode: "7-03-0039",
        description: "Chest Lock Freezer 400L -HSFZ-400W - Haus",
        uom: "Each",
        price: 2239.9,
        keywords: ["freezer", "chest", "lock", "400l", "appliance"]
    },
    {
        supplier: "Badili Hardware",
        productCode: "7-06-0403",
        description: "Blue Star Inverter Split Aircon 18000BTU(1.5TR)R32-IC18MYATU",
        uom: "Set",
        price: 2199.9,
        keywords: ["aircon", "air", "conditioner", "split", "inverter", "cooling"]
    },
    {
        supplier: "Badili Hardware",
        productCode: "8-34-1261",
        description: "Day Light Switch 10 Amps",
        uom: "Each",
        price: 229.9,
        keywords: ["switch", "light", "electrical", "10", "amp"]
    },
    {
        supplier: "Badili Hardware",
        productCode: "8-36-1556",
        description: "KUMUL LED Light Fitting Complete W/Tube 1x36Watt-SFB2 1C 136",
        uom: "Set",
        price: 36.9,
        keywords: ["led", "light", "fitting", "tube", "36", "watt"]
    },
    {
        supplier: "Badili Hardware",
        productCode: "8-34-1202",
        description: "Double GPO 10 Amps - Horizontal -KS315",
        uom: "Each",
        price: 19.9,
        keywords: ["gpo", "double", "electrical", "power", "outlet"]
    },
    {
        supplier: "Badili Hardware",
        productCode: "1020051",
        description: "Fibro Cement Sheet - 2400mm x 1200mm x 4.5mm (8'x4'x4.5mm)",
        uom: "Sheet",
        price: 49.95,
        keywords: ["fibro", "cement", "sheet", "building", "material"]
    },
    {
        supplier: "Badili Hardware",
        productCode: "2355031",
        description: "Dulux Ultimate High Gloss Enamel 4L",
        uom: "Can",
        price: 159.9,
        keywords: ["dulux", "paint", "enamel", "gloss", "4l"]
    },
    {
        supplier: "Leon Building Supply",
        productCode: "319408",
        description: "(BOSTIK) ECOFIX TILE ADHESIVE GREY 20KG",
        uom: "Bag",
        price: 33,
        keywords: ["tile", "adhesive", "grey", "20kg", "bostik"]
    },
    {
        supplier: "Leon Building Supply",
        productCode: "314479",
        description: "PYE TILE GROUT GREY 10KG",
        uom: "Each",
        price: 45.5,
        keywords: ["tile", "grout", "grey", "10kg", "pye"]
    },
    {
        supplier: "Leon Building Supply",
        productCode: "601564",
        description: "BOOK CABINET (3292#) 243292",
        uom: "Set",
        price: 420,
        keywords: ["book", "cabinet", "furniture", "storage"]
    },
    {
        supplier: "Leon Building Supply",
        productCode: "605767",
        description: "24AMG4G005 MIDEA GAS STOVE 4BRN 60*58*90CM(122217)",
        uom: "Each",
        price: 1490,
        keywords: ["gas", "stove", "midea", "4", "burner", "cooking"]
    },
    {
        supplier: "Leon Building Supply",
        productCode: "607501",
        description: "MERT490MTF46AP/MIDEA FRIDGE 338L",
        uom: "Each",
        price: 2767,
        keywords: ["fridge", "midea", "338l", "refrigerator", "appliance"]
    },
    {
        supplier: "Atlas Steel PNG",
        productCode: "1464014",
        description: "Coloured Flashing 0.48 per SqM Surfmist (Off White) End Covers",
        uom: "Square Meter",
        price: 64.73,
        keywords: ["flashing", "coloured", "surfmist", "white", "roofing"]
    },
    {
        supplier: "Brian Bell Trade Electrical",
        productCode: "118386",
        description: "GPO W/PROOF DOUBLE 15A TESLA WPGPO2/15 WPGPO2N/15",
        uom: "Each",
        price: 97.73,
        keywords: ["gpo", "waterproof", "double", "15a", "electrical"]
    },
    {
        supplier: "Brian Bell Trade Electrical",
        productCode: "103986",
        description: "CONDUIT CORR MD 20mmX50M GY CC2050MD-GEN MEDIUM DUTY 50MTR ROLL",
        uom: "Meter",
        price: 5.45,
        keywords: ["conduit", "20mm", "50m", "electrical", "grey"]
    },
    {
        supplier: "Hardware Haus",
        productCode: "6070201",
        description: "Dulux Mineral Turpentine 4L (Paint Thinner & Cleaner)",
        uom: "Each",
        price: 110,
        keywords: ["dulux", "turpentine", "paint", "thinner", "cleaner", "4l"]
    },
    {
        supplier: "Hardware Haus",
        productCode: "6020099",
        description: "Dulux Super Enamel High Gloss Blue Base 4 Litre",
        uom: "Each",
        price: 388.18,
        keywords: ["dulux", "enamel", "gloss", "blue", "paint", "4l"]
    },
    {
        supplier: "Hardware Haus",
        productCode: "2010517",
        description: "Compress Sheet (Cement Board) 18mm 2.4x1.2m SCG",
        uom: "Sheet",
        price: 299.09,
        keywords: ["cement", "board", "sheet", "18mm", "building"]
    },
    {
        supplier: "Hardware Haus",
        productCode: "1030438",
        description: "Premixed Mastik Tle Adhesive 20L SAS (Multistick)",
        uom: "Bag",
        price: 318.18,
        keywords: ["tile", "adhesive", "20l", "premixed", "mastik"]
    },
    {
        supplier: "Hardware Haus",
        productCode: "10090015",
        description: "Panelrib Colourbond 0.40x850mm [per meter]",
        uom: "Meter",
        price: 54.55,
        keywords: ["panelrib", "colourbond", "roofing", "850mm", "metal"]
    }
];

// Store added materials
let addedMaterials = [];
let currentMaterialIndex = -1;

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    setupMaterialSearch();
});

// Setup material search functionality
function setupMaterialSearch() {
    const materialInput = document.getElementById('material');
    
    // Add event listener for real-time search
    materialInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        if (query.length >= 2) {
            showMaterialSuggestions(query);
        } else {
            hideMaterialSuggestions();
        }
    });
    
    // Hide suggestions when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.input-group')) {
            hideMaterialSuggestions();
        }
    });
}

// Show material suggestions based on search
function showMaterialSuggestions(query) {
    const inputGroup = document.getElementById('material').parentElement;
    let suggestionsDiv = document.getElementById('material-suggestions');
    
    if (!suggestionsDiv) {
        suggestionsDiv = document.createElement('div');
        suggestionsDiv.id = 'material-suggestions';
        suggestionsDiv.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border: 1px solid #ddd;
            border-top: none;
            max-height: 200px;
            overflow-y: auto;
            z-index: 1000;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        `;
        inputGroup.style.position = 'relative';
        inputGroup.appendChild(suggestionsDiv);
    }
    
    // Filter materials based on search query
    const matches = materialsDatabase.filter(material => 
        material.description.toLowerCase().includes(query) ||
        material.keywords.some(keyword => keyword.includes(query))
    ).slice(0, 10);
    
    if (matches.length === 0) {
        suggestionsDiv.innerHTML = '<div style="padding: 10px; color: #666;">No materials found</div>';
        return;
    }
    
    suggestionsDiv.innerHTML = matches.map(material => `
        <div class="suggestion-item" style="
            padding: 10px;
            cursor: pointer;
            border-bottom: 1px solid #eee;
            transition: background-color 0.2s;
        " onmouseover="this.style.backgroundColor='#f5f5f5'" 
           onmouseout="this.style.backgroundColor='white'"
           onclick="selectMaterial('${material.description}', '${material.uom}')">
            <div style="font-weight: bold; font-size: 0.9em;">${material.description}</div>
            <div style="font-size: 0.8em; color: #666;">${material.supplier} - K${material.price} per ${material.uom}</div>
        </div>
    `).join('');
}

// Hide material suggestions
function hideMaterialSuggestions() {
    const suggestionsDiv = document.getElementById('material-suggestions');
    if (suggestionsDiv) {
        suggestionsDiv.remove();
    }
}

// Select a material from suggestions
function selectMaterial(description, uom) {
    document.getElementById('material').value = description;
    document.getElementById('unit').value = uom;
    hideMaterialSuggestions();
}

// Add material to the list
function addMaterial() {
    const material = document.getElementById('material').value.trim();
    const quantity = parseInt(document.getElementById('quantity').value);
    const unit = document.getElementById('unit').value.trim();
    
    if (!material || !quantity || !unit) {
        alert('Please fill in all fields');
        return;
    }
    
    // Add to materials list
    addedMaterials.push({
        material: material,
        quantity: quantity,
        unit: unit,
        id: Date.now()
    });
    
    // Clear form
    document.getElementById('materialForm').reset();
    hideMaterialSuggestions();
    
    // Update display
    updateMaterialsList();
    
    // Show first material in comparison table
    if (addedMaterials.length === 1) {
        currentMaterialIndex = 0;
        updateSupplierComparison();
    }
}

// Update materials list display
function updateMaterialsList() {
    const container = document.getElementById('materialsList');
    
    if (addedMaterials.length === 0) {
        container.innerHTML = '';
        return;
    }
    
    container.innerHTML = `
        <h3 style="margin-bottom: 15px; color: #333;">Added Materials (${addedMaterials.length})</h3>
        <div style="display: flex; flex-direction: column; gap: 10px;">
            ${addedMaterials.map((mat, index) => `
                <div class="material-item" style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 12px;
                    background: ${index === currentMaterialIndex ? '#e3f2fd' : '#f8f9fa'};
                    border: 1px solid ${index === currentMaterialIndex ? '#2196f3' : '#dee2e6'};
                    border-radius: 5px;
                    cursor: pointer;
                " onclick="selectMaterialForComparison(${index})">
                    <div>
                        <strong>${mat.material}</strong><br>
                        <span style="color: #666; font-size: 0.9em;">Qty: ${mat.quantity} ${mat.unit}</span>
                    </div>
                    <div style="display: flex; gap: 10px;">
                        ${index === currentMaterialIndex ? '<span style="color: #2196f3; font-size: 0.8em;">SELECTED</span>' : ''}
                        <button onclick="event.stopPropagation(); removeMaterial(${mat.id})" style="
                            background: #dc3545;
                            color: white;
                            border: none;
                            padding: 5px 10px;
                            border-radius: 3px;
                            cursor: pointer;
                            font-size: 0.8em;
                        ">Remove</button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Remove material from list
function removeMaterial(id) {
    addedMaterials = addedMaterials.filter(mat => mat.id !== id);
    
    // Adjust current index if needed
    if (currentMaterialIndex >= addedMaterials.length) {
        currentMaterialIndex = addedMaterials.length - 1;
    }
    
    updateMaterialsList();
    updateSupplierComparison();
}

// Select material for comparison
function selectMaterialForComparison(index) {
    currentMaterialIndex = index;
    updateMaterialsList();
    updateSupplierComparison();
}

// Update supplier comparison table
function updateSupplierComparison() {
    const tbody = document.querySelector('.supplier-table tbody');
    
    if (addedMaterials.length === 0 || currentMaterialIndex === -1) {
        // Show placeholder rows
        tbody.innerHTML = `
            <tr><td><div class="placeholder-cell"></div></td><td><div class="placeholder-cell"></div></td><td><div class="placeholder-cell"></div></td><td><div class="placeholder-cell"></div></td><td><div class="placeholder-cell"></div></td></tr>
            <tr><td><div class="placeholder-cell"></div></td><td><div class="placeholder-cell"></div></td><td><div class="placeholder-cell"></div></td><td><div class="placeholder-cell"></div></td><td><div class="placeholder-cell"></div></td></tr>
            <tr><td><div class="placeholder-cell"></div></td><td><div class="placeholder-cell"></div></td><td><div class="placeholder-cell"></div></td><td><div class="placeholder-cell"></div></td><td><div class="placeholder-cell"></div></td></tr>
        `;
        return;
    }
    
    const selectedMaterial = addedMaterials[currentMaterialIndex];
    const materialQuery = selectedMaterial.material.toLowerCase();
    
    // Find matching materials from database
    const matches = materialsDatabase.filter(material => 
        material.description.toLowerCase().includes(materialQuery.split(' ')[0]) ||
        material.keywords.some(keyword => 
            materialQuery.split(' ').some(word => keyword.includes(word))
        )
    );
    
    // Group by supplier and get best matches
    const supplierMatches = {};
    matches.forEach(material => {
        if (!supplierMatches[material.supplier] || 
            supplierMatches[material.supplier].price > material.price) {
            supplierMatches[material.supplier] = material;
        }
    });
    
    const suppliers = Object.values(supplierMatches).slice(0, 3);
    
    // Fill table with real data or placeholders
    tbody.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const supplier = suppliers[i];
        const row = document.createElement('tr');
        
        if (supplier) {
            const deliveryTime = Math.floor(Math.random() * 7) + 1; // Random 1-7 days
            const stock = Math.floor(Math.random() * 100) + 10; // Random stock
            const totalPrice = (supplier.price * selectedMaterial.quantity).toFixed(2);
            
            row.innerHTML = `
                <td><strong>${supplier.supplier}</strong><br><small>${supplier.description}</small></td>
                <td>K${supplier.price.toFixed(2)} per ${supplier.uom}<br><small>Total: K${totalPrice}</small></td>
                <td style="color: ${stock > 50 ? '#28a745' : stock > 20 ? '#ffc107' : '#dc3545'}">${stock} ${supplier.uom}</td>
                <td>${deliveryTime} day${deliveryTime > 1 ? 's' : ''}</td>
                <td>
                    <button onclick="selectSupplier('${supplier.supplier}', ${supplier.price}, '${supplier.productCode}')" style="
                        background: #007bff;
                        color: white;
                        border: none;
                        padding: 5px 12px;
                        border-radius: 3px;
                        cursor: pointer;
                        font-size: 0.9em;
                    ">Select</button>
                </td>
            `;
        } else {
            row.innerHTML = `
                <td><div class="placeholder-cell"></div></td>
                <td><div class="placeholder-cell"></div></td>
                <td><div class="placeholder-cell"></div></td>
                <td><div class="placeholder-cell"></div></td>
                <td><div class="placeholder-cell"></div></td>
            `;
        }
        
        tbody.appendChild(row);
    }
}

// Select a supplier for the current material
function selectSupplier(supplierName, price, productCode) {
    if (currentMaterialIndex !== -1) {
        addedMaterials[currentMaterialIndex].selectedSupplier = {
            name: supplierName,
            price: price,
            productCode: productCode
        };
        
        updateMaterialsList();
        
        // Show success message
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = 'Selected!';
        button.style.background = '#28a745';
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '#007bff';
        }, 1500);
    }
}

// Generate quote
function generateQuote() {
    if (addedMaterials.length === 0) {
        alert('Please add some materials first');
        return;
    }
    
    // Check if all materials have selected suppliers
    const materialsWithSuppliers = addedMaterials.filter(mat => mat.selectedSupplier);
    
    if (materialsWithSuppliers.length === 0) {
        alert('Please select suppliers for your materials');
        return;
    }
    
    // Calculate totals
    let totalAmount = 0;
    const quoteData = materialsWithSuppliers.map(material => {
        const itemTotal = material.quantity * material.selectedSupplier.price;
        totalAmount += itemTotal;
        return {
            ...material,
            itemTotal: itemTotal
        };
    });
    
    // Create quote display
    const quoteHtml = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        " onclick="closeQuote()">
            <div style="
                background: white;
                padding: 30px;
                border-radius: 10px;
                max-width: 800px;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            " onclick="event.stopPropagation()">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h2 style="margin: 0; color: #333;">Quotation Summary</h2>
                    <button onclick="closeQuote()" style="
                        background: #dc3545;
                        color: white;
                        border: none;
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        cursor: pointer;
                    ">×</button>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <strong>Quote Date:</strong> ${new Date().toLocaleDateString()}<br>
                    <strong>Total Items:</strong> ${materialsWithSuppliers.length}
                </div>
                
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                    <thead>
                        <tr style="background: #f8f9fa;">
                            <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Item</th>
                            <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Supplier</th>
                            <th style="padding: 10px; border: 1px solid #ddd; text-align: center;">Qty</th>
                            <th style="padding: 10px; border: 1px solid #ddd; text-align: right;">Unit Price</th>
                            <th style="padding: 10px; border: 1px solid #ddd; text-align: right;">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${quoteData.map(item => `
                            <tr>
                                <td style="padding: 10px; border: 1px solid #ddd;">${item.material}</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">${item.selectedSupplier.name}</td>
                                <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">${item.quantity} ${item.unit}</td>
                                <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">K${item.selectedSupplier.price.toFixed(2)}</td>
                                <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">K${item.itemTotal.toFixed(2)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                    <tfoot>
                        <tr style="background: #e9ecef; font-weight: bold;">
                            <td colspan="4" style="padding: 12px; border: 1px solid #ddd; text-align: right;">TOTAL AMOUNT:</td>
                            <td style="padding: 12px; border: 1px solid #ddd; text-align: right;">K${totalAmount.toFixed(2)}</td>
                        </tr>
                    </tfoot>
                </table>
                
                <div style="text-align: center; margin-top: 20px;">
                    <button onclick="printQuote()" style="
                        background: #28a745;
                        color: white;
                        padding: 10px 20px;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        margin-right: 10px;
                    ">Print Quote</button>
                    <button onclick="closeQuote()" style="
                        background: #6c757d;
                        color: white;
                        padding: 10px 20px;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                    ">Close</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', quoteHtml);
}

// Close quote modal
function closeQuote() {
    const modal = document.querySelector('[style*="position: fixed"]');
    if (modal) {
        modal.remove();
    }
}

// Print quote
function printQuote() {
    window.print();
}