const mongoose = require('mongoose');
const Product = require('../../products/models/Product');

const { Schema } = mongoose;

const ProductBill = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'products',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    deletedAt: {
        type: Date,
    },
}, {
    timestamps: true,
    collection: 'product_bill',
});

module.exports = mongoose.model('product_bill', ProductBill);
