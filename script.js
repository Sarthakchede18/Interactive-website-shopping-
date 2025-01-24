const user = {
    username: "admin",
    password: "admin123"
};

// Login
document.getElementById('login-form')?.addEventListener('submit', function (event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === user.username && password === user.password) {
        localStorage.setItem('loggedIn', 'true');
        window.location.href = 'shop.html';  // Redirect to the shop page
    } else {
        document.getElementById('error-msg').textContent = 'Invalid username or password.';
    }
});

// Logout 
document.getElementById('logout-btn')?.addEventListener('click', function () {
    localStorage.removeItem('loggedIn');
    window.location.href = 'index.html';  // Redirect back to login
});

// Check if user is logged in (on shop page)
if (window.location.pathname.includes('shop.html')) {
    if (localStorage.getItem('loggedIn') !== 'true') {
        window.location.href = 'index.html';  // Redirect to login if not logged in
    }
}

// Cart 
let cart = [];
let cartTotal = 0;

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const price = parseInt(e.target.getAttribute('data-price'));
        const itemName = e.target.parentElement.querySelector('h2').textContent;
        cart.push({ name: itemName, price: price });
        updateCart();
    });
});

function updateCart() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotalDisplay = document.getElementById('cart-total');
    
    cartCount.textContent = cart.length;
    cartItems.innerHTML = '';
    
    cartTotal = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price}`;
        cartItems.appendChild(li);
        cartTotal += item.price;
    });

    cartTotalDisplay.textContent = cartTotal;
}

document.getElementById('cart-btn')?.addEventListener('click', () => {
    document.getElementById('cart').style.display = 'block';
});

document.getElementById('checkout')?.addEventListener('click', () => {
    alert(`Thank you for your purchase! Your total is $${cartTotal}.`);
    cart = [];
    updateCart();
    document.getElementById('cart').style.display = 'none';
});
