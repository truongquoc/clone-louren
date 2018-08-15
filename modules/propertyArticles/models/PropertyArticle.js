const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const { Schema } = mongoose;

const PropertyArticle = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: 'property_categories',
        required: true,
    },
    type: {
        type: Schema.Types.ObjectId,
        ref: 'property_types',
        required: true,
    },
    status: {
        type: Schema.Types.ObjectId,
        ref: 'property_statuses',
        required: true,
    },
    city: {
        type: Schema.Types.ObjectId,
        ref: 'property_cities',
        required: true,
    },
    district: {
        type: Schema.Types.ObjectId,
        ref: 'property_districts',
        required: true,
    },
    conditions: [{
        condition: {
            type: Schema.Types.ObjectId,
            ref: 'property_conditions',
        },
        quantity: {
            type: Number,
            min: 0,
        },
    }],
    amenities: [{
        type: Schema.Types.ObjectId,
        ref: 'property_districts',
    }],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    display: {
        image: {
            type: String,
            required: true,
        },
        images: [{
            type: String,
            // required: true,
        }],
        video: {
            type: String,
        },
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        value: {
            type: Number,
        },
        display: {
            type: String,
        },
        type: {
            type: Schema.Types.ObjectId,
            ref: 'price_types',
        },
        isAgreement: {
            type: Boolean,
        },
    },
    area: {
        type: Number,
        min: 0,
    },
    isDraft: {
        type: Boolean,
        default: false,
    },
    isApproved: {
        type: Boolean,
        default: false,
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

PropertyArticle.plugin(mongoosePaginate);

module.exports = mongoose.model('property_articles', PropertyArticle);
