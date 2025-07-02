// Sample menu items
const menu = [
    { id: 1, name: "Margherita Pizza", price: 8.99 },
    { id: 2, name: "Cheeseburger", price: 6.49 },
    { id: 3, name: "Caesar Salad", price: 5.99 },
    { id: 4, name: "Chicken Biryani", price: 7.99 },
    { id: 5, name: "Veggie Wrap", price: 4.99 }
];

let cart = [];

function renderMenu() {
    const menuDiv = document.getElementById('menu-items');
    menuDiv.innerHTML = '';
    menu.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'menu-item';
        itemDiv.innerHTML = `
            <span>${item.name} - $${item.price.toFixed(2)}</span>
            <button onclick="addToCart(${item.id})">Add</button>
        `;
        menuDiv.appendChild(itemDiv);
    });
}

function addToCart(itemId) {
    const item = menu.find(m => m.id === itemId);
    const existing = cart.find(ci => ci.id === itemId);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...item, qty: 1 });
    }
    renderCart();
}

function removeFromCart(itemId) {
    cart = cart.filter(ci => ci.id !== itemId);
    renderCart();
}

function renderCart() {
    const cartDiv = document.getElementById('cart-items');
    cartDiv.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        total += item.qty * item.price;
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <span>${item.name} x${item.qty} - $${(item.price * item.qty).toFixed(2)}</span>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartDiv.appendChild(itemDiv);
    });
    document.getElementById('cart-total').textContent = total.toFixed(2);
    document.getElementById('place-order').disabled = cart.length === 0;
}

function placeOrder() {
    document.getElementById('cart').style.display = 'none';
    document.getElementById('menu').style.display = 'none';
    document.getElementById('order-confirmation').style.display = 'block';
}

document.getElementById('place-order').addEventListener('click', placeOrder);

// Initial rendering
renderMenu();
renderCart();