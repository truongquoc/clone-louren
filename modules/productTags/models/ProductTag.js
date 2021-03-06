const mongoose = require('mongoose');
const i18n = require('i18n');

const { Schema } = mongoose;

const ProductTag = new Schema({
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

ProductTag.methods.getName = function callback(locale) {
    if (locale === 'vi') {
        return this.name;
    }
    if (locale === 'en' && this.names.en) {
        return this.names.en;
    }
    return this.name;
};

module.exports = mongoose.model('product_tags', ProductTag);
