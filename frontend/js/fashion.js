// =========================================
// SHOP EASE - FASHION PAGE
// =========================================

const API_URL = "";


// =========================================
// GET USER
// =========================================

const fashionUser =
    JSON.parse(localStorage.getItem("user"));


// =========================================
// CHECK LOGIN
// =========================================

if (!fashionUser) {
    window.location.href = "login.html";
}


// =========================================
// CART COUNT
// =========================================

function updateCartCount() {

    const cart =
        JSON.parse(
            localStorage.getItem("cart") || "[]"
        );

    const count =
        cart.reduce(
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

updateCartCount();


// =========================================
// LOGOUT
// =========================================

const logoutBtn =
    document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("playWelcomeVoice");

        window.location.href = "login.html";
    });
}


// =========================================
// LOAD ALL FASHION PRODUCTS
// =========================================

async function loadFashionProducts() {

    const grid =
        document.getElementById(
            "fashionProductsGrid"
        );

    if (!grid) return;

    grid.innerHTML = `
        <div class="loading">
            Loading fashion...
        </div>
    `;

    try {

        const response =
            await fetch("/api/products");

        const allProducts =
            await response.json();

        if (!response.ok) {

            throw new Error(
                allProducts.message ||
                "Unable to load products"
            );
        }

        const fashionProducts =
            allProducts.filter(product =>
                product.category &&
                product.category.toLowerCase() ===
                "fashion"
            );

        displayFashionProducts(
            fashionProducts,
            "All Fashion"
        );

    } catch (error) {

        console.error(error);

        grid.innerHTML = `
            <div class="no-products">

                <div class="no-products-icon">
                    ⚠️
                </div>

                <h3>
                    Unable to load fashion
                </h3>

                <p>
                    Please make sure your server is running.
                </p>

            </div>
        `;
    }
}


// =========================================
// FILTER WOMEN / MEN / KIDS
// =========================================

async function filterFashion(gender) {

    const grid =
        document.getElementById(
            "fashionProductsGrid"
        );

    if (!grid) return;

    grid.innerHTML = `
        <div class="loading">
            Finding ${gender.toLowerCase()} fashion...
        </div>
    `;

    try {

        const response =
            await fetch("/api/products");

        const allProducts =
            await response.json();

        if (!response.ok) {

            throw new Error(
                allProducts.message ||
                "Unable to load products"
            );
        }

        const products =
            allProducts.filter(product => {

                return (
                    product.category &&
                    product.category.toLowerCase() ===
                    "fashion" &&

                    product.gender &&

                    product.gender.toLowerCase() ===
                    gender.toLowerCase()
                );

            });

        displayFashionProducts(
            products,
            `${gender}'s Fashion`
        );

        scrollToProducts();

    } catch (error) {

        console.error(error);

        grid.innerHTML = `
            <div class="no-products">

                <div class="no-products-icon">
                    ⚠️
                </div>

                <h3>
                    Something went wrong
                </h3>

                <p>
                    Please try again.
                </p>

            </div>
        `;
    }
}


// =========================================
// FILTER BY PRODUCT TYPE
// =========================================

async function filterType(type) {

    const grid =
        document.getElementById(
            "fashionProductsGrid"
        );

    if (!grid) return;

    grid.innerHTML = `
        <div class="loading">
            Finding ${type.toLowerCase()}...
        </div>
    `;

    try {

        const response =
            await fetch("/api/products");

        const allProducts =
            await response.json();

        if (!response.ok) {

            throw new Error(
                allProducts.message ||
                "Unable to load products"
            );
        }

        const products =
            allProducts.filter(product => {

                return (
                    product.category &&
                    product.category.toLowerCase() ===
                    "fashion" &&

                    product.type &&

                    product.type.toLowerCase() ===
                    type.toLowerCase()
                );

            });

        displayFashionProducts(
            products,
            type
        );

        scrollToProducts();

    } catch (error) {

        console.error(error);

        grid.innerHTML = `
            <div class="no-products">

                <div class="no-products-icon">
                    ⚠️
                </div>

                <h3>
                    Something went wrong
                </h3>

                <p>
                    Please try again.
                </p>

            </div>
        `;
    }
}


// =========================================
// DISPLAY PRODUCTS
// =========================================

function displayFashionProducts(
    products,
    title
) {

    const grid =
        document.getElementById(
            "fashionProductsGrid"
        );

    const heading =
        document.getElementById(
            "fashionTitle"
        );

    const subtitle =
        document.getElementById(
            "fashionSubtitle"
        );

    if (heading) {

        heading.textContent =
            title;
    }

    if (subtitle) {

        subtitle.textContent =
            `${products.length} product${products.length === 1 ? "" : "s"} found`;
    }

    if (!products.length) {

        grid.innerHTML = `

            <div class="no-products">

                <div class="no-products-icon">
                    🛍️
                </div>

                <h3>
                    No products found
                </h3>

                <p>
                    Try another fashion category.
                </p>

                <button
                    class="view-btn"
                    onclick="loadFashionProducts()">

                    View All Fashion

                </button>

            </div>

        `;

        return;
    }


    grid.innerHTML = "";


    products.forEach(product => {

        const card =
            document.createElement("div");

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
                    ${product.subcategory || product.category}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <p class="product-description">
                    ${
                        product.description ||
                        "Quality fashion product from ShopEase."
                    }
                </p>

                <div class="fashion-details">

                    ${
                        product.gender
                            ? `<span>👤 ${product.gender}</span>`
                            : ""
                    }

                    ${
                        product.occasion
                            ? `<span>🎉 ${product.occasion}</span>`
                            : ""
                    }

                    ${
                        product.color
                            ? `<span>🎨 ${product.color}</span>`
                            : ""
                    }

                </div>

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

        grid.appendChild(card);

    });
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
                localStorage.getItem("cart") || "[]"
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
// SCROLL TO PRODUCTS
// =========================================

function scrollToProducts() {

    const section =
        document.getElementById(
            "fashionProducts"
        );

    if (section) {

        section.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }
}


// =========================================
// SIMPLE AI GREETING
// NO MICROPHONE
// NO VOICE INPUT
// NO CONVERSATION
// =========================================

function fashionAIGreeting() {

    const message =
        document.getElementById(
            "aiMessage"
        );

    const userName =
        fashionUser?.name ||
        "Saniya";


    const greeting =
        `Hi ${userName}! Welcome to Fashion. What are you looking for today? 💜`;


    // Show message on screen

    if (message) {

        message.innerHTML = `
            🤖 <strong>
                Hi ${userName}!
            </strong>
            <br><br>
            Welcome to Fashion. What are you looking for today? 💜
        `;

    }


    // Speak only the greeting

    if (
        "speechSynthesis" in window
    ) {

        window.speechSynthesis.cancel();

        const speech =
            new SpeechSynthesisUtterance(
                `Hi ${userName}! Welcome to Fashion. What are you looking for today?`
            );

        speech.lang = "en-IN";
        speech.rate = 0.9;
        speech.pitch = 1.05;
        speech.volume = 1;

        window.speechSynthesis.speak(
            speech
        );
    }
}


// =========================================
// START PAGE
// =========================================

loadFashionProducts();


// AI GREETING WHEN FASHION PAGE OPENS

setTimeout(() => {

    fashionAIGreeting();

}, 800);