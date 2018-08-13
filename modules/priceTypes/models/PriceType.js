const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

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

PriceType.plugin(mongoosePaginate);

module.exports = mongoose.model('price_types', PriceType);
