const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const { Schema } = mongoose;

const Area = new Schema({
    propertyArticle: {
        type: Schema.Types.ObjectId,
        ref: 'property_articles',
    },
    coordinates: {
        shape: {
            type: Number,
            required: true,
        },
        polygon: {
            type: [[Number]],
            min: -180,
            max: 180,
        },
        rectangle: {
            north: {
                type: Number,
                min: -90,
                max: 90,
            },
            south: {
                type: Number,
                min: -90,
                max: 90,
            },
            east: {
                type: Number,
                min: -180,
                max: 180,
            },
            west: {
                type: Number,
                min: -180,
                max: 180,
            },
        },
    },
    color: {
        type: String,
        required: true,
    },
    deletedAt: {
        type: Date,
    },
}, {
    timestamps: true,
});

Area.plugin(mongoosePaginate);

module.exports = mongoose.model('areas', Area);
