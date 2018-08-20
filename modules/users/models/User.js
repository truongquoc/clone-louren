const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const bcrypt = require('bcryptjs');

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
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
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
    socialite: {
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
            default: 10,
        },
        uploaded: {
            type: Number,
            default: 0,
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

User.plugin(mongoosePaginate);

module.exports = mongoose.model('users', User);
