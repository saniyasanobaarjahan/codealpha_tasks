// =========================================
// SHOP EASE - MY ORDERS
// =========================================

(async function () {

    const box =
        document.getElementById("ordersList");

    // Check login
    if (!localStorage.getItem("token")) {
        window.location.href = "login.html";
        return;
    }

    if (!box) {
        return;
    }

    // Loading state
    box.innerHTML = `
        <div class="orders-loading">
            <div style="font-size: 30px; margin-bottom: 10px;">
                📦
            </div>
            Loading your orders...
        </div>
    `;


    try {

        const response =
            await fetch(
                "/api/orders/my-orders",
                {
                    headers: {
                        Authorization:
                            `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );


        const orders =
            await response.json();


        if (!response.ok) {
            throw new Error(
                orders.message ||
                "Unable to load orders."
            );
        }


        // No orders
        if (!orders.length) {

            box.innerHTML = `
                <div class="orders-empty">

                    <div class="orders-empty-icon">
                        🛍️
                    </div>

                    <h2>
                        No Orders Yet
                    </h2>

                    <p>
                        You haven't placed any orders yet.
                        Start shopping and your orders will appear here.
                    </p>

                    <a href="index.html">
                        Start Shopping
                    </a>

                </div>
            `;

            return;
        }


        // Display orders
        box.innerHTML =
            orders.map(
                order => {

                    const orderDate =
                        new Date(
                            order.createdAt
                        ).toLocaleString(
                            "en-IN"
                        );


                    const products =
                        order.items
                            .map(
                                item => {

                                    const itemTotal =
                                        Number(
                                            item.price
                                        ) *
                                        Number(
                                            item.quantity
                                        );


                                    return `
                                        <div class="order-product">

                                            <span class="order-product-name">
                                                ${item.name}
                                                ×
                                                ${item.quantity}
                                            </span>

                                            <span class="order-product-price">
                                                ₹${itemTotal.toLocaleString("en-IN")}
                                            </span>

                                        </div>
                                    `;
                                }
                            )
                            .join("");


                    return `
                        <div class="order-card">

                            <!-- Order Header -->

                            <div class="order-top">

                                <div>

                                    <div class="order-number">
                                        Order #${order._id.slice(-8)}
                                    </div>

                                    <div class="order-date">
                                        ${orderDate}
                                    </div>

                                </div>


                                <span class="order-status">
                                    ${order.status || "Processing"}
                                </span>

                            </div>


                            <!-- Products -->

                            <div class="order-products">

                                ${products}

                            </div>


                            <!-- Total -->

                            <div class="order-bottom">

                                <div class="order-total">
                                    Total:
                                    <span>
                                        ₹${Number(
                                            order.totalAmount
                                        ).toLocaleString("en-IN")}
                                    </span>
                                </div>

                            </div>

                        </div>
                    `;

                }
            ).join("");


    } catch (error) {

        console.error(
            "Orders loading error:",
            error
        );


        box.innerHTML = `
            <div class="orders-empty">

                <div class="orders-empty-icon">
                    ⚠️
                </div>

                <h2>
                    Unable to Load Orders
                </h2>

                <p>
                    ${error.message}
                </p>

                <a href="index.html">
                    Back to Shopping
                </a>

            </div>
        `;
    }

})();