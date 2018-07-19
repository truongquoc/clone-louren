const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const PropertyAmenity = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    deletedAt: {
        type: Date
    }
}, {
    timestamps: true
});

PropertyAmenity.plugin(mongoosePaginate);

module.exports = mongoose.model('property_amenities', PropertyAmenity);
