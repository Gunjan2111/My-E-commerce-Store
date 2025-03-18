document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products');
    const cartItems = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');
    let cart = [];

    // Load products from products.json
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.classList.add('product');
                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <div>
                        <h3>${product.name}</h3>
                        <p>$${product.price.toFixed(2)}</p>
                        <button data-id="${product.id}">Add to Cart</button>
                    </div>
                `;
                productsContainer.appendChild(productElement);
            });

            // Add event listeners to 'Add to Cart' buttons
            document.querySelectorAll('.product button').forEach(button => {
                button.addEventListener('click', addToCart);
            });
        });

    function addToCart(event) {
        const productId = event.target.dataset.id;
        if (!cart.includes(productId)) {
            cart.push(productId);
            updateCart();
        }
    }

    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(id => {
            fetch('products.json')
                .then(response => response.json())
                .then(products => {
                    const product = products.find(p => p.id === id);
                    const cartItem = document.createElement('li');
                    cartItem.innerHTML = `
                        <span>${product.name}</span>
                        <span>$${product.price.toFixed(2)}</span>
                    `;
                    cartItems.appendChild(cartItem);
                    total += product.price;
                    totalElement.textContent = total.toFixed(2);
                });
        });
    }
});
