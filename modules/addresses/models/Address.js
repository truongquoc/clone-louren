const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const { Schema } = mongoose;

const Address = new Schema({
    propertyArticle: {
        type: Schema.Types.ObjectId,
        ref: 'property_articles',
    },
    location: {
        type: {
            type: String,
            required: true,
            default: 'Point',
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
            required: true,
            min: -180,
            max: 180,
        },
    },
    deletedAt: {
        type: Date,
    },
}, {
    timestamps: true,
});

Address.plugin(mongoosePaginate);

module.exports = mongoose.model('addresses', Address);
