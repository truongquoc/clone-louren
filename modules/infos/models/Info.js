const mongoose = require('mongoose');

const { Schema } = mongoose;

const infoSchema = new Schema({
    title: {
        type: String,
        default: 'Mây Hiên Home',
    },
    bankAccount: String,
    workingTime: String,
    company: String,
    deputy: String,
    tax: String,
    phone: String,
    fax: String,
    location: String,
    email: String,
    security: String,
    google: String,
    facebook: String,
}, {
    timestamps: true,
});

module.exports = mongoose.model('infos', infoSchema);
