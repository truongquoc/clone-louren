const mongoose = require('mongoose');

const { Schema } = mongoose;

const Bill = new Schema({
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'product_bill',
        required: true,
    }],
    isShipped: {
        type: Number,
        default: false,
    },
    price: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
        default: false,
    },
    deletedAt: {
        type: Date,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('bills', Bill);
