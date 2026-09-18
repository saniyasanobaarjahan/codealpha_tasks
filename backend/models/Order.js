const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: String,
    price: Number,
    quantity: Number
  }],
  totalAmount: { type: Number, required: true },
  shippingAddress: {
    fullName: String,
    address: String,
    city: String,
    pincode: String
  },
  status: { type: String, default: 'Processing', enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'] }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
