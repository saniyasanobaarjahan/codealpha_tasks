const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;
    if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ message: 'Cart is empty' });

    const productIds = items.map(item => item.productId);
    const products = await Product.find({ _id: { $in: productIds } });
    const productMap = new Map(products.map(p => [String(p._id), p]));

    const orderItems = [];
    let totalAmount = 0;

    for (const item of items) {
      const product = productMap.get(String(item.productId));
      const quantity = Math.max(1, Number(item.quantity) || 1);
      if (!product) return res.status(400).json({ message: 'A product in your cart no longer exists' });
      if (product.stock < quantity) return res.status(400).json({ message: `${product.name} has insufficient stock` });

      orderItems.push({ product: product._id, name: product.name, price: product.price, quantity });
      totalAmount += product.price * quantity;
    }

    const order = await Order.create({ user: req.user.id, items: orderItems, totalAmount, shippingAddress });

    for (const item of orderItems) {
      await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
    }

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/my-orders', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
