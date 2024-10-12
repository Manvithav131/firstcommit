// Toggle Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
// Image Thumbnails
const mainImage = document.querySelector('.main-image');
const thumbnails = document.querySelectorAll('.thumbnail-images img');

thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
        mainImage.src = thumbnail.src;
    });
});

// Add to Cart Functionality
const addToCartBtn = document.getElementById('addToCartBtn');
addToCartBtn.addEventListener('click', () => {
    const flavor = document.getElementById('flavor').value;
    const size = document.getElementById('size').value;
    const quantity = parseInt(document.getElementById('quantity').value);

    const cake = {
        name: 'Chocolate Delight Birthday Cake',
        flavor,
        size,
        price: 35.00,
        quantity
    };

    // Retrieve existing cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Add new cake to cart
    cart.push(cake);

    // Save back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    alert('Cake added to cart!');
});
// Function to render cart items
function renderCart() {
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = '';
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <img src="images/cakes/birthday1.jpg" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>Flavor: ${item.flavor}</p>
                <p>Size: ${item.size}</p>
                <p>Price: $${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-actions">
                <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="quantity-input">
                <button data-index="${index}" class="remove-btn">Remove</button>
            </div>
        `;

        cartItemsContainer.appendChild(cartItem);
    });

    document.getElementById('totalPrice').innerText = total.toFixed(2);

    // Add event listeners for quantity changes and remove buttons
    const quantityInputs = document.querySelectorAll('.quantity-input');
    quantityInputs.forEach(input => {
        input.addEventListener('change', updateQuantity);
    });

    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(btn => {
        btn.addEventListener('click', removeItem);
    });
}

// Update quantity
function updateQuantity(e) {
    const index = e.target.getAttribute('data-index');
    const newQuantity = parseInt(e.target.value);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (newQuantity < 1) {
        e.target.value = 1;
        return;
    }
    cart[index].quantity = newQuantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// Remove item from cart
function removeItem(e) {
    const index = e.target.getAttribute('data-index');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// Checkout Button
const checkoutBtn = document.getElementById('checkoutBtn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        alert('Thank you for your purchase!');
        localStorage.removeItem('cart');
        renderCart();
    });
}

// Initial render
document.addEventListener('DOMContentLoaded', renderCart);
