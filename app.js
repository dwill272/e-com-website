// app.js

// Initialize cart from localStorage or an empty array if not present
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update the cart UI
function updateCart() {
    const cartCount = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    cartCount.textContent = cart.length;

    // Clear previous cart items
    cartItemsContainer.innerHTML = '';

    // Add each item in the cart to the cart UI
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div class="flex justify-between items-center">
                <span class="font-semibold">${item.name}</span>
                <span>$${item.price}</span>
            </div>
            <button class="remove-item text-red-500" data-id="${item.id}">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    // Save the cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to handle adding item to the cart
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }

    updateCart();
}

// Event listener to handle cart item removal
document.body.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-item')) {
        const productId = event.target.getAttribute('data-id');
        cart = cart.filter(item => item.id !== productId);
        updateCart();
    }
});

// Initialize the cart UI on page load
updateCart();

// Example: Add event listeners to all "Add to Cart" buttons on the product page
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.getAttribute('data-id');
        const productName = button.getAttribute('data-name');
        const productPrice = button.getAttribute('data-price');

        addToCart({
            id: productId,
            name: productName,
            price: parseFloat(productPrice)
        });
    });
});
