// =========================================
// SHOP EASE - CHECKOUT
// =========================================

const form =
    document.getElementById("checkoutForm");

// Check login
if (!localStorage.getItem("token")) {
    window.location.href = "login.html";
}

// Check cart
if (getCart().length === 0) {
    window.location.href = "cart.html";
}

// Form submit
if (form) {

    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const message =
                document.getElementById(
                    "checkoutMessage"
                );

            const fullName =
                document.getElementById(
                    "fullName"
                ).value.trim();

            const address =
                document.getElementById(
                    "address"
                ).value.trim();

            const city =
                document.getElementById(
                    "city"
                ).value.trim();

            const pincode =
                document.getElementById(
                    "pincode"
                ).value.trim();


            // Validate fields
            if (
                !fullName ||
                !address ||
                !city ||
                !pincode
            ) {
                message.textContent =
                    "Please fill in all delivery details.";

                return;
            }


            const cart = getCart();


            message.textContent =
                "Placing your order...";


            try {

                const response =
                    await fetch(
                        "/api/orders",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json",

                                Authorization:
                                    `Bearer ${localStorage.getItem("token")}`
                            },

                            body: JSON.stringify({

                                items: cart.map(
                                    item => ({
                                        productId:
                                            item.product,
                                        quantity:
                                            Number(
                                                item.quantity
                                            )
                                    })
                                ),

                                shippingAddress: {
                                    fullName:
                                        fullName,

                                    address:
                                        address,

                                    city:
                                        city,

                                    pincode:
                                        pincode
                                }
                            })
                        }
                    );


                const data =
                    await response.json();


                if (!response.ok) {

                    throw new Error(
                        data.message ||
                        "Unable to place order."
                    );
                }


                // Clear cart
                localStorage.removeItem(
                    "cart"
                );


                // Update cart badge
                const cartCount =
                    document.getElementById(
                        "cartCount"
                    );

                if (cartCount) {
                    cartCount.textContent =
                        "0";
                }


                message.innerHTML = `
                    ✅ <strong>Order placed successfully!</strong>
                    <br>
                    Order ID:
                    ${data.order._id}
                    <br><br>
                    Redirecting to your orders...
                `;


                form.reset();


                setTimeout(
                    () => {
                        window.location.href =
                            "orders.html";
                    },
                    1500
                );


            } catch (error) {

                console.error(
                    "Order error:",
                    error
                );

                message.textContent =
                    error.message;
            }
        }
    );
}