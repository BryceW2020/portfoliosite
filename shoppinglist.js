const PAGE_ID = 'shoppinglist';
const button = document.getElementById('addItem');
const shoppingList = document.getElementById('shoppingitems');
let userTextInput = document.getElementById('shoppinglist-text-input');
let userQuantityInput = document.getElementById('shoppinglist-quantity-input');

// Load items from localStorage when page loads
document.addEventListener('DOMContentLoaded', () => loadFromLocalStorage(PAGE_ID));

clearText = () => {
    userTextInput.value = '';
    userQuantityInput.value = '';
}

function removeItem(event) {
    const itemToRemove = event.target.parentElement;
    itemToRemove.remove();
    saveListToLocalStorage(PAGE_ID);
}

function addItem() {
    // Validate inputs
    if (!userTextInput.value.trim()) {
        alert('Please enter an item name');
        return;
    }
    
    // Create list item container
    let listItem = document.createElement('li');
    
    // Create the item text with quantity
    let itemText = document.createElement('span');
    itemText.textContent = `${userTextInput.value} (Qty: ${userQuantityInput.value || 1})`;
    
    // Create remove button
    let removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'removeItem';
    removeBtn.addEventListener('click', removeItem);
    
    // Append elements to list item
    listItem.appendChild(itemText);
    listItem.appendChild(removeBtn);
    
    // Append list item to shopping list
    shoppingList.appendChild(listItem);
    
    // Save to localStorage
    saveListToLocalStorage(PAGE_ID);
    
    // Clear input fields
    clearText();
}

button.addEventListener('click', addItem);

// Handle Enter key in text input
userTextInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addItem();
    }
});

// Handle Enter key in quantity input
userQuantityInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addItem();
    }
});

// Save entire list to localStorage
function saveListToLocalStorage(pageId) {
    const items = [];
    const listItems = shoppingList.querySelectorAll('li');
    
    listItems.forEach(item => {
        // Get the text content without the "Remove" button text
        const itemText = item.querySelector('span').textContent;
        items.push(itemText);
    });
    
    localStorage.setItem(pageId, JSON.stringify(items));
}

// Load list from localStorage
function loadFromLocalStorage(pageId) {
    const savedItems = JSON.parse(localStorage.getItem(pageId));
    
    if (savedItems) {
        savedItems.forEach(itemText => {
            // Parse the item text (format: "Item Name (Qty: X)")
            const match = itemText.match(/(.*) \(Qty: (\d+)\)/);
            
            if (match) {
                const itemName = match[1];
                const quantity = match[2];
                
                // Create list item
                let listItem = document.createElement('li');
                
                // Create item text
                let itemSpan = document.createElement('span');
                itemSpan.textContent = `${itemName} (Qty: ${quantity})`;
                
                // Create remove button
                let removeBtn = document.createElement('button');
                removeBtn.textContent = 'Remove';
                removeBtn.className = 'removeItem';
                removeBtn.addEventListener('click', removeItem);
                
                // Append elements
                listItem.appendChild(itemSpan);
                listItem.appendChild(removeBtn);
                
                // Add to list
                shoppingList.appendChild(listItem);
            }
        });
    }
}