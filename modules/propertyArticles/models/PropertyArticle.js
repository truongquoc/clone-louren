const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const PropertyArticleFilterClass = require('../repositories/filters/PropertyArticleFilter');

const PropertyArticleFilter = new PropertyArticleFilterClass();

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
        ref: 'cities',
        required: true,
    },
    district: {
        type: Schema.Types.ObjectId,
        ref: 'districts',
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
        ref: 'property_amenities',
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

PropertyArticle.statics.search = function search(params) {
    if (params.search) {
        params.title = params.search;
    }
    return PropertyArticleFilter.apply(this, params);
};

PropertyArticle.plugin(mongoosePaginate);

module.exports = mongoose.model('property_articles', PropertyArticle);
