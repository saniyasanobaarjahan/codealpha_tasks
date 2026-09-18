// =========================================
// SHOP EASE - CART
// =========================================

// Get cart from localStorage
function getCart() {
    return JSON.parse(
        localStorage.getItem("cart") || "[]"
    );
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();
}

// Format price in Indian Rupees
function money(price) {
    return "₹" + Number(price).toLocaleString("en-IN");
}

// Update cart number in navbar
function updateCartCount() {
    const cart = getCart();

    const count = cart.reduce(
        (total, item) =>
            total + Number(item.quantity || 0),
        0
    );

    const cartCount =
        document.getElementById("cartCount");

    if (cartCount) {
        cartCount.textContent = count;
    }
}

// Display cart products
function renderCart() {

    const box =
        document.getElementById("cartItems");

    const summary =
        document.getElementById("cartSummary");

    if (!box || !summary) {
        return;
    }

    const cart = getCart();

    // Empty cart
    if (cart.length === 0) {

        box.innerHTML = `
            <div class="form-card">
                <h3>Your cart is empty 🛒</h3>

                <p>
                    Add some products to your cart
                    and they will appear here.
                </p>

                <br>

                <a
                    class="btn primary"
                    href="index.html">
                    Continue Shopping
                </a>
            </div>
        `;

        summary.innerHTML = "";

        updateCartCount();

        return;
    }

    // Display products
    box.innerHTML = cart.map(
        (item, index) => {

            return `
                <div class="cart-row">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >

                    <div>
                        <h3>
                            ${item.name}
                        </h3>

                        <p>
                            ${money(item.price)}
                        </p>
                    </div>

                    <div class="qty">

                        <button
                            onclick="changeQty(${index}, -1)">
                            −
                        </button>

                        <strong>
                            ${item.quantity}
                        </strong>

                        <button
                            onclick="changeQty(${index}, 1)">
                            +
                        </button>

                    </div>

                    <button
                        class="btn"
                        onclick="removeItem(${index})">
                        Remove
                    </button>

                </div>
            `;
        }
    ).join("");

    // Calculate total
    const total = cart.reduce(
        (sum, item) =>
            sum +
            Number(item.price) *
            Number(item.quantity),
        0
    );

    summary.innerHTML = `
        <h3>
            Total: ${money(total)}
        </h3>

        <br>

        <a
            class="btn primary"
            href="checkout.html">
            Proceed to Checkout
        </a>
    `;

    updateCartCount();
}


// Increase / decrease quantity
function changeQty(index, delta) {

    const cart = getCart();

    if (!cart[index]) {
        return;
    }

    cart[index].quantity =
        Number(cart[index].quantity) + delta;

    // Remove when quantity reaches 0
    if (cart[index].quantity < 1) {
        cart.splice(index, 1);
    }

    saveCart(cart);

    renderCart();
}


// Remove product
function removeItem(index) {

    const cart = getCart();

    cart.splice(index, 1);

    saveCart(cart);

    renderCart();
}


// Initial load
renderCart();
updateCartCount();