const mongoose = require('mongoose');
const i18n = require('i18n');

const { Schema } = mongoose;

const ProductType = new Schema({
    parentType: {
        type: Schema.Types.ObjectId,
        ref: 'product_types',
    },
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    names: {
        en: {
            type: String,
            required: true,
            trim: true,
            // unique: true,
        },
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

ProductType.methods.getName = function callback(locale) {
    if (locale === 'vi') {
        return this.name;
    }
    if (locale === 'en' && this.names.en) {
        return this.names.en;
    }
    return this.name;
};

module.exports = mongoose.model('product_types', ProductType);
