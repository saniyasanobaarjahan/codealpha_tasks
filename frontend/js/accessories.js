// =========================================
// SHOP EASE - ACCESSORIES PAGE
// =========================================

const user = JSON.parse(localStorage.getItem("user"));


// =========================================
// LOGIN CHECK
// =========================================

if (!user) {
    window.location.href = "login.html";
}


// =========================================
// CART COUNT
// =========================================

function updateCartCount() {

    const cart = JSON.parse(
        localStorage.getItem("cart") || "[]"
    );

    const count = cart.reduce(
        (total, item) => total + item.quantity,
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

        window.location.href = "login.html";
    });
}


// =========================================
// LOAD ALL ACCESSORIES
// =========================================

async function loadAccessoryProducts() {

    const grid =
        document.getElementById("accessoryProductsGrid");

    if (!grid) return;

    grid.innerHTML = `
        <div class="loading">
            Loading accessories...
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
                "Unable to load accessories"
            );
        }

        const accessories =
            allProducts.filter(product =>
                product.category &&
                product.category.toLowerCase() ===
                "accessories"
            );

        displayAccessories(
            accessories,
            "All Accessories"
        );

    } catch (error) {

        console.error(error);

        grid.innerHTML = `
            <div class="no-products">

                <div class="no-products-icon">
                    ⚠️
                </div>

                <h3>
                    Unable to load accessories
                </h3>

                <p>
                    Please make sure your server is running.
                </p>

            </div>
        `;
    }
}


// =========================================
// FILTER BY SUBCATEGORY
// =========================================

async function filterAccessorySubcategory(
    subcategory
) {

    const grid =
        document.getElementById("accessoryProductsGrid");

    if (!grid) return;

    grid.innerHTML = `
        <div class="loading">
            Finding ${subcategory.toLowerCase()}...
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
                    "accessories" &&

                    product.subcategory &&
                    product.subcategory.toLowerCase() ===
                    subcategory.toLowerCase()
                );

            });

        displayAccessories(
            products,
            subcategory
        );

        scrollToAccessories();

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
// FILTER BY TYPE
// =========================================

async function filterAccessoryType(type) {

    const grid =
        document.getElementById("accessoryProductsGrid");

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
                    "accessories" &&

                    product.type &&
                    product.type.toLowerCase() ===
                    type.toLowerCase()
                );

            });

        displayAccessories(
            products,
            type
        );

        scrollToAccessories();

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
// DISPLAY ACCESSORIES
// =========================================

function displayAccessories(
    products,
    title
) {

    const grid =
        document.getElementById(
            "accessoryProductsGrid"
        );

    const heading =
        document.getElementById(
            "accessoryTitle"
        );

    const subtitle =
        document.getElementById(
            "accessorySubtitle"
        );


    if (heading) {
        heading.textContent = title;
    }


    if (subtitle) {

        subtitle.textContent =
            `${products.length} product${
                products.length === 1
                    ? ""
                    : "s"
            } found`;

    }


    if (!products.length) {

        grid.innerHTML = `

            <div class="no-products">

                <div class="no-products-icon">
                    💍
                </div>

                <h3>
                    No products found
                </h3>

                <p>
                    Try another accessory category.
                </p>

                <button
                    class="view-btn"
                    onclick="loadAccessoryProducts()">

                    View All Accessories

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
                    ${
                        product.subcategory ||
                        product.category
                    }
                </span>


                <h3>
                    ${product.name}
                </h3>


                <p class="product-description">
                    ${
                        product.description ||
                        "Quality accessory from ShopEase."
                    }
                </p>


                <div class="fashion-details">

                    ${
                        product.gender
                            ? `
                                <span>
                                    👤 ${product.gender}
                                </span>
                              `
                            : ""
                    }

                    ${
                        product.occasion
                            ? `
                                <span>
                                    🎉 ${product.occasion}
                                </span>
                              `
                            : ""
                    }

                    ${
                        product.color
                            ? `
                                <span>
                                    🎨 ${product.color}
                                </span>
                              `
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
                localStorage.getItem("cart") ||
                "[]"
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

                product: product._id,

                name: product.name,

                price: product.price,

                image: product.image,

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

        alert(error.message);
    }
}


// =========================================
// SCROLL TO PRODUCTS
// =========================================

function scrollToAccessories() {

    const section =
        document.getElementById(
            "accessoryProducts"
        );

    if (section) {

        section.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }
}


// =========================================
// 🤖 ACCESSORIES AI VOICE
// =========================================

// =========================================
// 🤖 AUTOMATIC ACCESSORIES AI
// =========================================

function startAccessoriesAI(autoStart = false) {

    const message =
        document.getElementById("aiMessage");


    if (!message) {
        return;
    }


    const userName =
        user?.name || "Saniya";


    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    // =====================================
    // AI GREETING
    // =====================================

    const greeting =
        `Hi ${userName}! Welcome to Accessories. What kind of accessory are you looking for today?`;


    message.innerHTML = `
        🤖 <strong>Hi ${userName}!</strong>
        I'm ready to help you complete your look.
    `;


    speak(greeting);


    // =====================================
    // CHECK VOICE SUPPORT
    // =====================================

    if (!SpeechRecognition) {

        message.innerHTML = `
            🤖 <strong>Hi ${userName}!</strong><br>
            Voice input is not supported in this browser.
            Please use Google Chrome.
        `;

        return;
    }


    // =====================================
    // START LISTENING
    // =====================================

    const startListening = () => {

        const recognition =
            new SpeechRecognition();


        recognition.lang = "en-IN";

        recognition.continuous = false;

        recognition.interimResults = false;


        message.innerHTML = `
            🎤 <strong>I'm listening...</strong><br>
            Tell me what accessory you're looking for.
        `;


        try {

            recognition.start();

        } catch (error) {

            console.log(
                "Voice listening could not start automatically."
            );


            message.innerHTML = `
                🤖 I'm ready to help, ${userName}.<br><br>
                🎤 Click <strong>Talk to AI</strong>
                and tell me what you're looking for.
            `;

        }


        recognition.onresult =
            function(event) {

                const transcript =
                    event.results[0][0].transcript;


                message.innerHTML = `
                    🗣️ You said:
                    <strong>"${transcript}"</strong>
                    <br><br>
                    🤖 Let me find something for you...
                `;


                processAccessoryRequest(
                    transcript
                );

            };


        recognition.onerror =
            function(event) {

                console.log(
                    "Voice recognition:",
                    event.error
                );


                message.innerHTML = `
                    🤖 I'm ready, ${userName}.<br><br>
                    🎤 Click <strong>Talk to AI</strong>
                    to speak with me.
                `;

            };

    };


    // =====================================
    // AUTOMATIC CATEGORY AI
    // =====================================

    if (autoStart) {

        setTimeout(() => {

            startListening();

        }, 3500);

    }

}


// =========================================
// PROCESS AI REQUEST
// =========================================

async function processAccessoryRequest(text) {

    const lowerText =
        text.toLowerCase();


    let type = "";

    let subcategory = "";

    let occasion = "";

    let gender = "";

    let maxPrice = null;


    // =====================================
    // ACCESSORY TYPE
    // =====================================

    const typeKeywords = {

        earrings: "Earrings",

        earring: "Earrings",

        necklace: "Necklace",

        necklaces: "Necklace",

        bracelet: "Bracelet",

        bracelets: "Bracelet",

        ring: "Rings",

        rings: "Rings",

        bangles: "Bangles",

        bangle: "Bangles",

        anklet: "Anklet",

        anklets: "Anklet",

        "maang tikka": "Maang Tikka",

        watch: "Watch",

        watches: "Watch",

        handbag: "Handbag",

        handbags: "Handbag",

        sunglasses: "Sunglasses",

        wallet: "Wallet",

        wallets: "Wallet",

        belt: "Belt"

    };


    for (const keyword in typeKeywords) {

        if (lowerText.includes(keyword)) {

            type =
                typeKeywords[keyword];

            break;
        }
    }


    // =====================================
    // SUBCATEGORY
    // =====================================

    if (
        lowerText.includes("jewellery") ||
        lowerText.includes("jewelry") ||
        lowerText.includes("jewel")
    ) {

        subcategory = "Jewellery";

    } else if (
        lowerText.includes("bag") ||
        lowerText.includes("handbag")
    ) {

        subcategory = "Bags";

    } else if (
        lowerText.includes("watch")
    ) {

        subcategory = "Watches";

    } else if (
        lowerText.includes("sunglasses")
    ) {

        subcategory = "Sunglasses";

    } else if (
        lowerText.includes("wallet")
    ) {

        subcategory = "Wallets";

    }


    // =====================================
    // GENDER
    // =====================================

    if (
        lowerText.includes("women") ||
        lowerText.includes("woman") ||
        lowerText.includes("ladies") ||
        lowerText.includes("girl")
    ) {

        gender = "Women";

    } else if (
        lowerText.includes("men") ||
        lowerText.includes("man") ||
        lowerText.includes("boy")
    ) {

        gender = "Men";

    }


    // =====================================
    // OCCASION
    // =====================================

    if (
        lowerText.includes("wedding") ||
        lowerText.includes("marriage")
    ) {

        occasion = "Wedding";

    } else if (
        lowerText.includes("party") ||
        lowerText.includes("birthday")
    ) {

        occasion = "Party";

    } else if (
        lowerText.includes("office") ||
        lowerText.includes("formal")
    ) {

        occasion = "Office";

    } else if (
        lowerText.includes("daily") ||
        lowerText.includes("casual")
    ) {

        occasion = "Casual";

    }


    // =====================================
    // BUDGET
    // =====================================

    const priceMatch =
        lowerText.match(
            /(?:under|below|less than|within)\s*(?:₹|rs\.?|inr)?\s*(\d+)/
        );


    if (priceMatch) {

        maxPrice =
            Number(priceMatch[1]);

    }


    // =====================================
    // GET PRODUCTS
    // =====================================

    try {

        const response =
            await fetch("/api/products");

        const allProducts =
            await response.json();


        let products =
            allProducts.filter(product =>
                product.category &&
                product.category.toLowerCase() ===
                "accessories"
            );


        // Type
        if (type) {

            products =
                products.filter(product =>
                    product.type &&
                    product.type.toLowerCase() ===
                    type.toLowerCase()
                );

        }


        // Subcategory
        if (subcategory) {

            products =
                products.filter(product =>
                    product.subcategory &&
                    product.subcategory.toLowerCase() ===
                    subcategory.toLowerCase()
                );

        }


        // Gender
        if (gender) {

            products =
                products.filter(product =>
                    product.gender &&
                    product.gender.toLowerCase() ===
                    gender.toLowerCase()
                );

        }


        // Occasion
        if (occasion) {

            products =
                products.filter(product =>
                    product.occasion &&
                    product.occasion.toLowerCase() ===
                    occasion.toLowerCase()
                );

        }


        // Budget
        if (maxPrice !== null) {

            products =
                products.filter(
                    product =>
                        Number(product.price) <=
                        maxPrice
                );

        }


        displayAccessories(
            products,
            "🤖 AI Recommendations"
        );


        scrollToAccessories();


        // =================================
        // AI RESPONSE
        // =================================

        let responseText =
            `I found ${products.length} accessories for you`;


        if (type) {

            responseText +=
                ` including ${type.toLowerCase()}`;

        }


        if (subcategory) {

            responseText +=
                ` from ${subcategory.toLowerCase()}`;

        }


        if (gender) {

            responseText +=
                ` for ${gender.toLowerCase()}`;

        }


        if (occasion) {

            responseText +=
                ` for a ${occasion.toLowerCase()} occasion`;

        }


        if (maxPrice !== null) {

            responseText +=
                ` under ₹${maxPrice}`;

        }


        responseText += ".";


        const message =
            document.getElementById(
                "aiMessage"
            );


        if (message) {

            message.innerHTML =
                `🤖 ${responseText}`;

        }


        speak(
            `Hi ${user?.name || "Saniya"}. ${responseText}`
        );


    } catch (error) {

        console.error(error);

    }

}


// =========================================
// TEXT TO SPEECH
// =========================================

function speak(text) {

    if (!("speechSynthesis" in window)) {
        return;
    }


    window.speechSynthesis.cancel();


    const speech =
        new SpeechSynthesisUtterance(text);


    speech.lang = "en-IN";

    speech.rate = 0.9;

    speech.pitch = 1.05;

    speech.volume = 1;


    window.speechSynthesis.speak(
        speech
    );

}


// =========================================
// INITIAL LOAD
// =========================================


loadAccessoryProducts();


// Start Accessories AI automatically
setTimeout(() => {

    startAccessoriesAI(true);

}, 800);