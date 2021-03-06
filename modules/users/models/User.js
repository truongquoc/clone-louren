const mongoose = require('mongoose');

const { Schema } = mongoose;

const User = new Schema({
    roles: [{
        type: Schema.Types.ObjectId,
        ref: 'roles',
        required: true,
    }],
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        // required: true,
        trim: true,
        // unique: false,
    },
    password: {
        type: String,
        // required: true,
        trim: true,
    },
    gender: {
        type: Number,
        min: 1,
        max: 3,
    },
    telephone: {
        type: String,
        trim: true,
    },
    birthday: {
        type: Date,
    },
    address: {
        type: String,
        trim: true,
    },
    avatar: {
        type: String,
        trim: true,
    },
    socialMedias: {
        facebook: {
            type: String,
        },
        google: {
            type: String,
        },
    },
    images: {
        max: {
            type: Number,
            default: 50,
            min: 0,
        },
        uploaded: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    articles: {
        max: {
            type: Number,
            default: 3,
            min: 0,
        },
        published: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
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

module.exports = mongoose.model('users', User);
