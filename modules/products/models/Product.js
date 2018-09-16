const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
    type: {
        type: Schema.Types.ObjectId,
        ref: 'product_types',
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    name: {
        type: String,
        required: true,
        min: 0,
    },
    sku: {
        type: String,
        unique: true,
    },
    price: {
        number: {
            min: 0,
            required: true,
            type: Number,
        },
        string: {
            type: String,
            required: true,
        },
    },
    detail: String,
    info: String,
    image: {
        cover: {
            type: String,
            required: true,
            default: '',
        },
        array: {
            type: Array,
            default: [],
        },
    },
    discount: {
        type: Number,
        min: 0,
        max: 1,
        default: 0,
    },
    quantity: {
        type: Number,
        min: 0,
        required: true,
    },
    isDraft: {
        type: Boolean,
        default: false,
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
    slug: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    deletedAt: {
        type: Date,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('products', productSchema);
