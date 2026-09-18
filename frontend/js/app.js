// =========================================
// SHOP EASE - MAIN APP
// =========================================

const API_URL = "";


// =========================================
// GET LOGGED-IN USER
// =========================================

const user =
    JSON.parse(
        localStorage.getItem("user")
    );


// =========================================
// CHECK LOGIN
// =========================================

if (!user) {

    window.location.href =
        "login.html";
}


// =========================================
// PERSONALIZED WELCOME
// =========================================

if (user) {

    const welcomeTitle =
        document.getElementById(
            "welcomeTitle"
        );

    const welcomeMessage =
        document.getElementById(
            "welcomeMessage"
        );


    const userName =
        user.name || "Saniya";


    if (welcomeTitle) {

        welcomeTitle.textContent =
            `Hi, ${userName} 👋`;

    }


    if (welcomeMessage) {

        welcomeMessage.textContent =
            "Welcome back! Everything you love, all in one place.";

    }


    // =====================================
    // WELCOME VOICE — ONLY ONCE AFTER LOGIN
    // =====================================

    const shouldPlayWelcome =
        localStorage.getItem(
            "playWelcomeVoice"
        );


    if (shouldPlayWelcome === "true") {

        // Remove the flag immediately
        // so refresh will NOT speak again
        localStorage.removeItem(
            "playWelcomeVoice"
        );


        setTimeout(() => {

            speakWelcome(userName);

        }, 1000);

    }

}


// =========================================
// WELCOME VOICE
// =========================================

function speakWelcome(name) {

    if (
        !("speechSynthesis" in window)
    ) {
        return;
    }


    window.speechSynthesis.cancel();


    const message =
        `Hi ${name}, welcome to ShopEase. Happy shopping!`;


    const speech =
        new SpeechSynthesisUtterance(
            message
        );


    speech.lang = "en-IN";

    speech.rate = 0.9;

    speech.pitch = 1.05;

    speech.volume = 1;


    window.speechSynthesis.speak(
        speech
    );
}


// =========================================
// LOGOUT
// =========================================

const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );


if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        () => {

            localStorage.removeItem(
                "token"
            );

            localStorage.removeItem(
                "user"
            );

            localStorage.removeItem(
                "playWelcomeVoice"
            );


            window.location.href =
                "login.html";

        }
    );
}


// =========================================
// CART COUNT
// =========================================

function updateCartCount() {

    const cart =
        JSON.parse(
            localStorage.getItem(
                "cart"
            ) || "[]"
        );


    const count =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    const cartCount =
        document.getElementById(
            "cartCount"
        );


    if (cartCount) {

        cartCount.textContent =
            count;

    }

}


updateCartCount();


// =========================================
// LOAD PRODUCTS
// =========================================

async function loadProducts(
    category = ""
) {

    const productsGrid =
        document.getElementById(
            "productsGrid"
        );


    if (!productsGrid) {
        return;
    }


    productsGrid.innerHTML = `
        <div class="loading">
            Loading products...
        </div>
    `;


    try {

        const response =
            await fetch(
                "/api/products"
            );


        const allProducts =
            await response.json();


        if (!response.ok) {

            throw new Error(
                allProducts.message ||
                "Unable to load products"
            );

        }


        // =================================
        // FILTER CATEGORY
        // =================================

        let products =
            allProducts;


        if (category) {

            products =
                allProducts.filter(
                    product => {

                        if (
                            !product.category
                        ) {
                            return false;
                        }


                        return (
                            product.category
                                .trim()
                                .toLowerCase()
                            ===
                            category
                                .trim()
                                .toLowerCase()
                        );

                    }
                );

        }


        // =================================
        // SECTION TITLE
        // =================================

        const heading =
            document.querySelector(
                "#products .section-heading h2"
            );


        const subtitle =
            document.querySelector(
                "#products .section-heading span"
            );


        if (heading) {

            heading.textContent =
                category
                    ? `${category} Products`
                    : "Featured Products";

        }


        if (subtitle) {

            subtitle.textContent =
                category
                    ? `Showing ${category.toLowerCase()} products`
                    : "Pick your favorites";

        }


        // =================================
        // NO PRODUCTS
        // =================================

        if (
            products.length === 0
        ) {

            productsGrid.innerHTML = `

                <div class="no-products">

                    <div class="no-products-icon">
                        🛍️
                    </div>

                    <h3>
                        No ${category} products found
                    </h3>

                    <p>
                        We are adding more products soon.
                    </p>

                    <button
                        class="view-btn"
                        onclick="loadProducts()">

                        View All Products

                    </button>

                </div>

            `;

            return;
        }


        // =================================
        // DISPLAY PRODUCTS
        // =================================

        productsGrid.innerHTML = "";


        products.forEach(
            product => {

                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "product-card";


                card.innerHTML = `

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        class="product-image"
                    >


                    <div class="product-info">

                        <span class="product-category">
                            ${product.category}
                        </span>


                        <h3>
                            ${product.name}
                        </h3>


                        <p class="product-description">
                            ${
                                product.description ||
                                "Quality product from ShopEase."
                            }
                        </p>


                        <div class="product-price">

                            ₹${Number(product.price)
                                .toLocaleString("en-IN")}

                        </div>


                        <div class="product-actions">

                            <button
                                class="view-btn"
                                onclick="viewProduct('${product._id}')">

                                View Details

                            </button>


                            <button
                                class="add-btn"
                                onclick="addToCart('${product._id}')">

                                Add to Cart 🛒

                            </button>

                        </div>

                    </div>

                `;


                productsGrid.appendChild(
                    card
                );

            }
        );


    } catch (error) {

        console.error(
            "Product loading error:",
            error
        );


        productsGrid.innerHTML = `

            <div class="no-products">

                <div class="no-products-icon">
                    ⚠️
                </div>

                <h3>
                    Unable to load products
                </h3>

                <p>
                    Please make sure the server is running.
                </p>

            </div>

        `;

    }

}


// =========================================
// CATEGORY FILTER
// =========================================

function filterCategory(
    category
) {

    loadProducts(
        category
    );


    const productsSection =
        document.getElementById(
            "products"
        );


    if (productsSection) {

        productsSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


// =========================================
// VIEW PRODUCT
// =========================================

function viewProduct(id) {

    window.location.href =
        `product.html?id=${id}`;

}


// =========================================
// ADD TO CART
// =========================================

async function addToCart(id) {

    try {

        const response =
            await fetch(
                `/api/products/${id}`
            );


        const product =
            await response.json();


        if (!response.ok) {

            throw new Error(
                product.message ||
                "Product not found"
            );

        }


        let cart =
            JSON.parse(
                localStorage.getItem(
                    "cart"
                ) || "[]"
            );


        const existingProduct =
            cart.find(
                item =>
                    item.product ===
                    product._id
            );


        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({

                product:
                    product._id,

                name:
                    product.name,

                price:
                    product.price,

                image:
                    product.image,

                quantity: 1

            });

        }


        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );


        updateCartCount();


        alert(
            `${product.name} added to cart 🛒`
        );


    } catch (error) {

        alert(
            error.message
        );

    }

}


// =========================================
// INITIAL LOAD
// =========================================

loadProducts();