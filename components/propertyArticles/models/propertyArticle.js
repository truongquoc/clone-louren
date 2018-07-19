const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const PropertyArticle = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: 'property_categories',
        required: true
    },
    type: {
        type: Schema.Types.ObjectId,
        ref: 'property_types',
        required: true
    },
    status: {
        type: Schema.Types.ObjectId,
        ref: 'property_statuses',
        required: true
    },
    city: {
        type: Schema.Types.ObjectId,
        ref: 'property_cities',
        required: true
    },
    district: {
        type: Schema.Types.ObjectId,
        ref: 'property_districts',
        required: true
    },
    conditions: [{
        condition: {
            type: Schema.Types.ObjectId,
            ref: 'property_conditions',
            required: true
        },
        quantity: {
            type: Number,
            min: 0
        }
    }],
    amenities: [{
        type: Schema.Types.ObjectId,
        ref: 'property_districts'
    }],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    images: [{
        url: {
            type: String,
            required: true
        },
        check: {
            type: Boolean,
            default: false
        }
    }],
    video: {
        type: String
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number
    },
    area: {
        type: Number,
        min: 0
    },
    interestRate: {
        type: Number,
        min: 0
    },
    downPayment: {
        type: Number,
        min: 0
    },
    deletedAt: {
        type: Date
    }
}, {
    timestamps: true
});

PropertyArticle.plugin(mongoosePaginate);

module.exports = mongoose.model('property_articles', PropertyArticle);
