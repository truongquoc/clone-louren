const mongoose = require('mongoose');

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
        default: 1,
    },
    price: {
        type: Number,
        required: true,
    },
    deletedAt: {
        type: Date,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('product_bill', ProductBill);
