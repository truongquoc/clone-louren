const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProductType = new Schema({
    parentType: {
        type: Schema.Types.ObjectId,
        ref: 'product_types',
    },
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
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

module.exports = mongoose.model('product_types', ProductType);
