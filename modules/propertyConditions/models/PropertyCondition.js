const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const { Schema } = mongoose;

const PropertyCondition = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    icon: {
        type: String,
        required: true,
        trim: true,
    },
    deletedAt: {
        type: Date,
    },
}, {
    timestamps: true,
});

PropertyCondition.plugin(mongoosePaginate);

module.exports = mongoose.model('property_conditions', PropertyCondition);
