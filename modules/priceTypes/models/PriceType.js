const mongoose = require('mongoose');

const { Schema } = mongoose;

const PriceType = new Schema({
    name: {
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

module.exports = mongoose.model('price_types', PriceType);
