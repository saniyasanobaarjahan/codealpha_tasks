const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

const app = express();

// Render provides PORT automatically.
// For local development, it will use 5000.
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve frontend files
app.use(express.static(path.join(__dirname, "..", "frontend")));

// API status
app.get("/api", (req, res) => {
    res.json({
        message: "E-commerce API is running 🚀"
    });
});

// API routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

// Serve frontend pages
app.get("*", (req, res) => {
    res.sendFile(
        path.join(__dirname, "..", "frontend", "index.html")
    );
});

// Connect to MongoDB and start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});