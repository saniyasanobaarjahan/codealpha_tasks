const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();


// =========================================
// SHOP EASE - PRODUCT SEED
// BEAUTY + FOOTWEAR + HOME APPLIANCES
// =========================================

const products = [

    // =====================================
    // 💄 BEAUTY
    // =====================================

    {
        name: "Huda Beauty Liquid Matte Lipstick",
        description: "Long-lasting liquid matte lipstick.",
        category: "Beauty",
        subcategory: "Makeup",
        type: "Lipstick",
        gender: "Women",
        occasion: "Party",
        color: "Red",
        size: ["Standard"],
        price: 2200,
        image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80",
        stock: 15
    },

    {
        name: "Huda Beauty Nude Eyeshadow Palette",
        description: "Beautiful nude shades for everyday and party makeup.",
        category: "Beauty",
        subcategory: "Makeup",
        type: "Eyeshadow",
        gender: "Women",
        occasion: "Party",
        color: "Nude",
        size: ["Standard"],
        price: 4200,
        image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
        stock: 10
    },

    {
        name: "Maybelline Fit Me Foundation",
        description: "Lightweight foundation with natural-looking coverage.",
        category: "Beauty",
        subcategory: "Makeup",
        type: "Foundation",
        gender: "Women",
        occasion: "Daily Use",
        color: "Natural",
        size: ["30ml"],
        price: 649,
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
        stock: 25
    },

    {
        name: "Maybelline SuperStay Matte Ink",
        description: "Long-lasting liquid lipstick.",
        category: "Beauty",
        subcategory: "Makeup",
        type: "Lipstick",
        gender: "Women",
        occasion: "Party",
        color: "Pink",
        size: ["Standard"],
        price: 699,
        image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80",
        stock: 30
    },

    {
        name: "MAC Matte Lipstick",
        description: "Classic matte lipstick with rich color.",
        category: "Beauty",
        subcategory: "Makeup",
        type: "Lipstick",
        gender: "Women",
        occasion: "Party",
        color: "Red",
        size: ["3g"],
        price: 2100,
        image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80",
        stock: 12
    },

    {
        name: "MAC Studio Fix Foundation",
        description: "Professional-looking foundation with buildable coverage.",
        category: "Beauty",
        subcategory: "Makeup",
        type: "Foundation",
        gender: "Women",
        occasion: "Party",
        color: "Beige",
        size: ["30ml"],
        price: 3500,
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
        stock: 10
    },

    {
        name: "Lakme 9 to 5 Primer + Matte Lip Color",
        description: "Matte lip color designed for long wear.",
        category: "Beauty",
        subcategory: "Makeup",
        type: "Lipstick",
        gender: "Women",
        occasion: "Office",
        color: "Pink",
        size: ["Standard"],
        price: 599,
        image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80",
        stock: 30
    },

    {
        name: "L'Oreal Paris Revitalift Cream",
        description: "Daily face cream for a smooth-looking complexion.",
        category: "Beauty",
        subcategory: "Skincare",
        type: "Face Cream",
        gender: "Women",
        occasion: "Daily Use",
        color: "White",
        size: ["50ml"],
        price: 899,
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=800&q=80",
        stock: 20
    },

    {
        name: "L'Oreal Paris Shampoo",
        description: "Hair care shampoo for smooth and healthy-looking hair.",
        category: "Beauty",
        subcategory: "Hair Care",
        type: "Shampoo",
        gender: "Unisex",
        occasion: "Daily Use",
        color: "White",
        size: ["650ml"],
        price: 699,
        image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80",
        stock: 25
    },

    {
        name: "Nykaa Matte Nail Enamel",
        description: "Stylish nail color with smooth matte finish.",
        category: "Beauty",
        subcategory: "Nail Care",
        type: "Nail Polish",
        gender: "Women",
        occasion: "Party",
        color: "Pink",
        size: ["10ml"],
        price: 249,
        image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80",
        stock: 40
    },

    {
        name: "SUGAR Cosmetics Contour De Force",
        description: "Face contouring makeup for a defined look.",
        category: "Beauty",
        subcategory: "Makeup",
        type: "Contour",
        gender: "Women",
        occasion: "Party",
        color: "Brown",
        size: ["Standard"],
        price: 699,
        image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
        stock: 20
    },

    {
        name: "Kay Beauty Hydrating Foundation",
        description: "Lightweight foundation for natural-looking coverage.",
        category: "Beauty",
        subcategory: "Makeup",
        type: "Foundation",
        gender: "Women",
        occasion: "Party",
        color: "Beige",
        size: ["30ml"],
        price: 1200,
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
        stock: 15
    },

    {
        name: "The Ordinary Niacinamide Serum",
        description: "Lightweight facial serum for everyday skincare.",
        category: "Beauty",
        subcategory: "Skincare",
        type: "Serum",
        gender: "Unisex",
        occasion: "Daily Use",
        color: "Clear",
        size: ["30ml"],
        price: 850,
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
        stock: 20
    },

    {
        name: "Rare Beauty Soft Pinch Blush",
        description: "Lightweight liquid blush with buildable color.",
        category: "Beauty",
        subcategory: "Makeup",
        type: "Blush",
        gender: "Women",
        occasion: "Party",
        color: "Pink",
        size: ["Standard"],
        price: 2600,
        image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
        stock: 10
    },

    {
        name: "e.l.f. Hydrating Primer",
        description: "Smooth makeup primer for a fresh-looking base.",
        category: "Beauty",
        subcategory: "Makeup",
        type: "Primer",
        gender: "Women",
        occasion: "Daily Use",
        color: "Clear",
        size: ["30ml"],
        price: 850,
        image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=800&q=80",
        stock: 20
    },


    // =====================================
    // 👟 FOOTWEAR
    // =====================================

    {
        name: "Nike Air Max Running Shoes",
        description: "Lightweight running shoes designed for daily workouts.",
        category: "Footwear",
        subcategory: "Sports Shoes",
        type: "Running Shoes",
        gender: "Unisex",
        occasion: "Sports",
        color: "Red",
        size: ["6", "7", "8", "9", "10"],
        price: 7999,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
        stock: 15
    },

    {
        name: "Adidas Ultraboost Shoes",
        description: "Comfortable sports shoes for running and training.",
        category: "Footwear",
        subcategory: "Sports Shoes",
        type: "Running Shoes",
        gender: "Unisex",
        occasion: "Sports",
        color: "Black",
        size: ["6", "7", "8", "9", "10"],
        price: 9999,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
        stock: 12
    },

    {
        name: "Puma Casual Sneakers",
        description: "Stylish sneakers for everyday casual outfits.",
        category: "Footwear",
        subcategory: "Sneakers",
        type: "Sneakers",
        gender: "Unisex",
        occasion: "Casual",
        color: "White",
        size: ["6", "7", "8", "9", "10"],
        price: 3499,
        image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80",
        stock: 20
    },

    {
        name: "Skechers Walking Shoes",
        description: "Comfortable walking shoes for everyday use.",
        category: "Footwear",
        subcategory: "Sports Shoes",
        type: "Walking Shoes",
        gender: "Unisex",
        occasion: "Daily Use",
        color: "Black",
        size: ["6", "7", "8", "9", "10"],
        price: 4999,
        image: "https://images.unsplash.com/photo-1554139867-4b5b7f9c9a76?auto=format&fit=crop&w=800&q=80",
        stock: 15
    },

    {
        name: "New Balance 574 Sneakers",
        description: "Classic lifestyle sneakers with comfortable cushioning.",
        category: "Footwear",
        subcategory: "Sneakers",
        type: "Sneakers",
        gender: "Unisex",
        occasion: "Casual",
        color: "Grey",
        size: ["6", "7", "8", "9", "10"],
        price: 6999,
        image: "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=800&q=80",
        stock: 12
    },

    {
        name: "Reebok Training Shoes",
        description: "Sports shoes suitable for gym and training.",
        category: "Footwear",
        subcategory: "Sports Shoes",
        type: "Training Shoes",
        gender: "Unisex",
        occasion: "Sports",
        color: "Black",
        size: ["6", "7", "8", "9", "10"],
        price: 3999,
        image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80",
        stock: 18
    },

    {
        name: "ASICS Gel Running Shoes",
        description: "Running shoes designed for comfortable daily training.",
        category: "Footwear",
        subcategory: "Sports Shoes",
        type: "Running Shoes",
        gender: "Unisex",
        occasion: "Sports",
        color: "Blue",
        size: ["6", "7", "8", "9", "10"],
        price: 6499,
        image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=800&q=80",
        stock: 15
    },

    {
        name: "Converse Chuck Taylor Sneakers",
        description: "Classic canvas sneakers for casual styling.",
        category: "Footwear",
        subcategory: "Sneakers",
        type: "Sneakers",
        gender: "Unisex",
        occasion: "Casual",
        color: "Black",
        size: ["6", "7", "8", "9", "10"],
        price: 4499,
        image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=800&q=80",
        stock: 15
    },

    {
        name: "Vans Old Skool Sneakers",
        description: "Iconic casual sneakers for everyday street style.",
        category: "Footwear",
        subcategory: "Sneakers",
        type: "Sneakers",
        gender: "Unisex",
        occasion: "Casual",
        color: "Black",
        size: ["6", "7", "8", "9", "10"],
        price: 4999,
        image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80",
        stock: 14
    },

    {
        name: "Crocs Classic Clogs",
        description: "Comfortable lightweight clogs for everyday use.",
        category: "Footwear",
        subcategory: "Clogs",
        type: "Clogs",
        gender: "Unisex",
        occasion: "Casual",
        color: "Blue",
        size: ["6", "7", "8", "9", "10"],
        price: 2999,
        image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&w=800&q=80",
        stock: 20
    },

    {
        name: "Woodland Leather Boots",
        description: "Durable leather boots for outdoor and casual wear.",
        category: "Footwear",
        subcategory: "Boots",
        type: "Boots",
        gender: "Men",
        occasion: "Casual",
        color: "Brown",
        size: ["7", "8", "9", "10"],
        price: 5999,
        image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=800&q=80",
        stock: 12
    },

    {
        name: "Bata Formal Shoes",
        description: "Classic formal shoes for office and professional wear.",
        category: "Footwear",
        subcategory: "Formal Shoes",
        type: "Formal Shoes",
        gender: "Men",
        occasion: "Office",
        color: "Black",
        size: ["7", "8", "9", "10"],
        price: 1999,
        image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80",
        stock: 20
    },

    {
        name: "Metro Women's Heels",
        description: "Elegant heels for parties and special occasions.",
        category: "Footwear",
        subcategory: "Heels",
        type: "Heels",
        gender: "Women",
        occasion: "Party",
        color: "Black",
        size: ["5", "6", "7", "8"],
        price: 2499,
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
        stock: 15
    },

    {
        name: "ALDO Women's Heels",
        description: "Stylish party heels with an elegant design.",
        category: "Footwear",
        subcategory: "Heels",
        type: "Heels",
        gender: "Women",
        occasion: "Party",
        color: "Red",
        size: ["5", "6", "7", "8"],
        price: 5999,
        image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=800&q=80",
        stock: 10
    },

    {
        name: "Clarks Men's Formal Shoes",
        description: "Premium formal footwear for office and events.",
        category: "Footwear",
        subcategory: "Formal Shoes",
        type: "Formal Shoes",
        gender: "Men",
        occasion: "Office",
        color: "Brown",
        size: ["7", "8", "9", "10"],
        price: 6999,
        image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80",
        stock: 10
    },

    {
        name: "Red Tape Casual Sneakers",
        description: "Modern sneakers for casual everyday outfits.",
        category: "Footwear",
        subcategory: "Sneakers",
        type: "Sneakers",
        gender: "Men",
        occasion: "Casual",
        color: "White",
        size: ["7", "8", "9", "10"],
        price: 2499,
        image: "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=800&q=80",
        stock: 20
    },

    {
        name: "Campus Women's Sports Shoes",
        description: "Affordable sports shoes for walking and workouts.",
        category: "Footwear",
        subcategory: "Sports Shoes",
        type: "Sports Shoes",
        gender: "Women",
        occasion: "Sports",
        color: "Pink",
        size: ["5", "6", "7", "8"],
        price: 1299,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
        stock: 25
    },

    {
        name: "Sparx Men's Sneakers",
        description: "Comfortable everyday sneakers at an affordable price.",
        category: "Footwear",
        subcategory: "Sneakers",
        type: "Sneakers",
        gender: "Men",
        occasion: "Casual",
        color: "Grey",
        size: ["7", "8", "9", "10"],
        price: 1499,
        image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80",
        stock: 25
    },

    {
        name: "Liberty Men's Casual Shoes",
        description: "Comfortable casual shoes for everyday wear.",
        category: "Footwear",
        subcategory: "Casual Shoes",
        type: "Casual Shoes",
        gender: "Men",
        occasion: "Casual",
        color: "Brown",
        size: ["7", "8", "9", "10"],
        price: 1799,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
        stock: 20
    },

    {
        name: "Mochi Women's Flats",
        description: "Comfortable flats for daily and office wear.",
        category: "Footwear",
        subcategory: "Flats",
        type: "Flats",
        gender: "Women",
        occasion: "Office",
        color: "Beige",
        size: ["5", "6", "7", "8"],
        price: 1999,
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
        stock: 18
    },


    // =====================================
    // 🏠 HOME APPLIANCES
    // =====================================

    {
        name: "Philips Air Fryer",
        description: "Digital air fryer for quick and convenient cooking.",
        category: "Home",
        subcategory: "Kitchen Appliances",
        type: "Air Fryer",
        gender: "Unisex",
        occasion: "Home",
        color: "Black",
        size: ["4.1L"],
        price: 8999,
        image: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80",
        stock: 10
    },

    {
        name: "Prestige Induction Cooktop",
        description: "Easy-to-use induction cooktop for everyday cooking.",
        category: "Home",
        subcategory: "Kitchen Appliances",
        type: "Induction Cooktop",
        gender: "Unisex",
        occasion: "Home",
        color: "Black",
        size: ["2000W"],
        price: 2499,
        image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=80",
        stock: 18
    },

    {
        name: "Bajaj Mixer Grinder",
        description: "Powerful mixer grinder for everyday kitchen use.",
        category: "Home",
        subcategory: "Kitchen Appliances",
        type: "Mixer Grinder",
        gender: "Unisex",
        occasion: "Home",
        color: "White",
        size: ["750W"],
        price: 3499,
        image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=800&q=80",
        stock: 15
    },

    {
        name: "Havells Air Cooler",
        description: "Efficient air cooler for comfortable home cooling.",
        category: "Home",
        subcategory: "Cooling",
        type: "Air Cooler",
        gender: "Unisex",
        occasion: "Home",
        color: "White",
        size: ["40L"],
        price: 8999,
        image: "https://images.unsplash.com/photo-1625961332771-6f8b1c7d0f45?auto=format&fit=crop&w=800&q=80",
        stock: 8
    },

    {
        name: "LG Microwave Oven",
        description: "Microwave oven for reheating and everyday cooking.",
        category: "Home",
        subcategory: "Kitchen Appliances",
        type: "Microwave Oven",
        gender: "Unisex",
        occasion: "Home",
        color: "Black",
        size: ["28L"],
        price: 11999,
        image: "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=800&q=80",
        stock: 8
    },

    {
        name: "Samsung Double Door Refrigerator",
        description: "Spacious refrigerator with modern cooling features.",
        category: "Home",
        subcategory: "Large Appliances",
        type: "Refrigerator",
        gender: "Unisex",
        occasion: "Home",
        color: "Silver",
        size: ["253L"],
        price: 28999,
        image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=80",
        stock: 6
    },

    {
        name: "IFB Front Load Washing Machine",
        description: "Automatic washing machine for convenient laundry.",
        category: "Home",
        subcategory: "Large Appliances",
        type: "Washing Machine",
        gender: "Unisex",
        occasion: "Home",
        color: "Silver",
        size: ["7kg"],
        price: 24999,
        image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80",
        stock: 6
    },

    {
        name: "Bosch Dishwasher",
        description: "Modern dishwasher for convenient kitchen cleaning.",
        category: "Home",
        subcategory: "Kitchen Appliances",
        type: "Dishwasher",
        gender: "Unisex",
        occasion: "Home",
        color: "Silver",
        size: ["13 Place"],
        price: 39999,
        image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80",
        stock: 5
    },

    {
        name: "Dyson Cordless Vacuum Cleaner",
        description: "Cordless vacuum cleaner for convenient home cleaning.",
        category: "Home",
        subcategory: "Cleaning Appliances",
        type: "Vacuum Cleaner",
        gender: "Unisex",
        occasion: "Home",
        color: "Silver",
        size: ["Cordless"],
        price: 29999,
        image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80",
        stock: 5
    },

    {
        name: "Eureka Forbes Vacuum Cleaner",
        description: "Powerful vacuum cleaner for daily home cleaning.",
        category: "Home",
        subcategory: "Cleaning Appliances",
        type: "Vacuum Cleaner",
        gender: "Unisex",
        occasion: "Home",
        color: "Red",
        size: ["1600W"],
        price: 6999,
        image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80",
        stock: 10
    },

    {
        name: "Morphy Richards OTG Oven",
        description: "Compact oven for baking, grilling and toasting.",
        category: "Home",
        subcategory: "Kitchen Appliances",
        type: "OTG Oven",
        gender: "Unisex",
        occasion: "Home",
        color: "Black",
        size: ["28L"],
        price: 6499,
        image: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80",
        stock: 9
    },

    {
        name: "Usha Dry Iron",
        description: "Lightweight electric iron for everyday clothes care.",
        category: "Home",
        subcategory: "Home Appliances",
        type: "Iron",
        gender: "Unisex",
        occasion: "Home",
        color: "Blue",
        size: ["1000W"],
        price: 899,
        image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80",
        stock: 20
    },

    {
        name: "Crompton Ceiling Fan",
        description: "Energy-efficient ceiling fan for comfortable ventilation.",
        category: "Home",
        subcategory: "Electrical Appliances",
        type: "Ceiling Fan",
        gender: "Unisex",
        occasion: "Home",
        color: "White",
        size: ["1200mm"],
        price: 2199,
        image: "https://images.unsplash.com/photo-1558008258-3256797b43f3?auto=format&fit=crop&w=800&q=80",
        stock: 15
    },

    {
        name: "Voltas Split Air Conditioner",
        description: "Split AC for efficient cooling.",
        category: "Home",
        subcategory: "Cooling",
        type: "Air Conditioner",
        gender: "Unisex",
        occasion: "Home",
        color: "White",
        size: ["1.5 Ton"],
        price: 34999,
        image: "https://images.unsplash.com/photo-1631545806609-9f2a8c2f4f55?auto=format&fit=crop&w=800&q=80",
        stock: 5
    },

    {
        name: "Blue Star Split Air Conditioner",
        description: "Powerful split AC designed for home cooling.",
        category: "Home",
        subcategory: "Cooling",
        type: "Air Conditioner",
        gender: "Unisex",
        occasion: "Home",
        color: "White",
        size: ["1.5 Ton"],
        price: 36999,
        image: "https://images.unsplash.com/photo-1631545806609-9f2a8c2f4f55?auto=format&fit=crop&w=800&q=80",
        stock: 5
    },

    {
        name: "Kent RO Water Purifier",
        description: "Home water purifier for everyday drinking water.",
        category: "Home",
        subcategory: "Water Appliances",
        type: "Water Purifier",
        gender: "Unisex",
        occasion: "Home",
        color: "White",
        size: ["8L"],
        price: 12999,
        image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=800&q=80",
        stock: 8
    },

    {
        name: "V-Guard Water Heater",
        description: "Electric water heater for convenient hot water.",
        category: "Home",
        subcategory: "Water Appliances",
        type: "Water Heater",
        gender: "Unisex",
        occasion: "Home",
        color: "White",
        size: ["15L"],
        price: 7499,
        image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
        stock: 10
    },

    {
        name: "Panasonic Rice Cooker",
        description: "Easy electric rice cooker for everyday meals.",
        category: "Home",
        subcategory: "Kitchen Appliances",
        type: "Rice Cooker",
        gender: "Unisex",
        occasion: "Home",
        color: "White",
        size: ["1.8L"],
        price: 2499,
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
        stock: 15
    },

    {
        name: "Butterfly Gas Stove",
        description: "Compact multi-burner gas stove for everyday cooking.",
        category: "Home",
        subcategory: "Kitchen Appliances",
        type: "Gas Stove",
        gender: "Unisex",
        occasion: "Home",
        color: "Black",
        size: ["3 Burner"],
        price: 4999,
        image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=80",
        stock: 12
    },

    {
        name: "Godrej Frost Free Refrigerator",
        description: "Modern frost-free refrigerator with spacious storage.",
        category: "Home",
        subcategory: "Large Appliances",
        type: "Refrigerator",
        gender: "Unisex",
        occasion: "Home",
        color: "Silver",
        size: ["236L"],
        price: 23999,
        image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=80",
        stock: 6
    },

    {
        name: "Samsung Air Purifier",
        description: "Modern air purifier for cleaner indoor air.",
        category: "Home",
        subcategory: "Air Care",
        type: "Air Purifier",
        gender: "Unisex",
        occasion: "Home",
        color: "White",
        size: ["Medium"],
        price: 12999,
        image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80",
        stock: 8
    },

    {
        name: "Philips Electric Kettle",
        description: "Fast-boiling electric kettle for tea and hot water.",
        category: "Home",
        subcategory: "Kitchen Appliances",
        type: "Electric Kettle",
        gender: "Unisex",
        occasion: "Home",
        color: "Black",
        size: ["1.5L"],
        price: 1499,
        image: "https://images.unsplash.com/photo-1594213114663-d94db9b171c8?auto=format&fit=crop&w=800&q=80",
        stock: 20
    }

];


// =========================================
// CONNECT TO MONGODB
// =========================================

async function seedDatabase() {

    try {

        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected successfully ✅");


        // Remove only old Beauty, Footwear and Home products
        await Product.deleteMany({
            category: {
                $in: [
                    "Beauty",
                    "Footwear",
                    "Home"
                ]
            }
        });

        console.log(
            "Old Beauty, Footwear and Home products removed 🗑️"
        );


        // Add new products
        await Product.insertMany(products);

        console.log(
            `${products.length} new Beauty, Footwear and Home products added successfully ✅`
        );


        await mongoose.connection.close();

        console.log(
            "Database connection closed."
        );

    } catch (error) {

        console.error(
            "Seed error ❌",
            error.message
        );

        process.exit(1);
    }
}


seedDatabase();