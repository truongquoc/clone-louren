const mongoose = require('mongoose');
const ProductBill = require('./ProductBill');

const { Schema } = mongoose;

const Bill = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    userInformation: {
        name: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            trim: true,
        },
        telephone: {
            type: String,
            trim: true,
        },
        address: {
            type: String,
            trim: true,
        },
        paymentMethod: {
            type: String,
            trim: true,
            enum: ['cod', 'via-bank'],
        },
        note: {
            type: String,
            trim: true,
        },
    },
    productBill: [{
        type: Schema.Types.ObjectId,
        ref: 'product_bill',
        required: true,
    }],
    code: {
        type: String,
        unique: true,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    isApproved: {
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
