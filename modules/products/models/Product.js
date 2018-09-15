const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        number: Number,
        string: String,
    },
    detail: String,
    image: {
        cover: {
            type: String,
            require: true,
            default: '',
        },
        array: {
            type: Array,
            default: [],
        },
    },
    info: String,
    type: {
        type: Schema.Types.ObjectId,
        ref: 'product_types',
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'users',
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
