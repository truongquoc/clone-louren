const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const PropertyStatus = new Schema({
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

PropertyStatus.plugin(mongoosePaginate);

module.exports = mongoose.model('property_statuses', PropertyStatus);
