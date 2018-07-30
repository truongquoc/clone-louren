const mongoose = require('mongoose');

const { Schema } = mongoose;

const Role = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('roles', Role);
