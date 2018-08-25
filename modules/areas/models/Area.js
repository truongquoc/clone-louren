const mongoose = require('mongoose');
const commonConstant = require('../../../constants/commonConstant');

const { Schema } = mongoose;

const Area = new Schema({
    propertyArticle: {
        type: Schema.Types.ObjectId,
        ref: 'property_articles',
    },
    coordinates: {
        type: [[Number]],
        required: true,
        min: -180,
        max: 180,
    },
    color: {
        type: String,
        default: commonConstant.polygonColor,
    },
    deletedAt: {
        type: Date,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('areas', Area);
