const { dbUrl } = require('./config');

// connect to database
module.exports = function connectDatabase(mongoose) {
    mongoose.Promise = global.Promise;

    mongoose.connect(dbUrl, { useNewUrlParser: true });
};
