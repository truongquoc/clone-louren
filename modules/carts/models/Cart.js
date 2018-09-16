const mongoose = require('mongoose');

const { Schema } = mongoose;

const Cart = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    products: [{
        item: {
            type: Schema.Types.ObjectId,
            ref: 'products',
            required: true,
        },
        quantity: {
            type: Number,
            min: 1,
            required: true,
        },
    }],
}, {
    timestamps: true,
});

module.exports = mongoose.model('carts', Cart);
