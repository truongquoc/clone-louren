const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const PropertyType = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    slug: {
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

PropertyType.plugin(mongoosePaginate);

module.exports = mongoose.model('property_types', PropertyType);
