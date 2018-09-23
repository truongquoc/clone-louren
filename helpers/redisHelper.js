const redis = require('redis');

const client = redis.createClient();

module.exports = {
    getRedis: (req, res, next) => {
        client.get('info', (err, reply) => {
            if (reply) {
                res.locals.info = JSON.parse(reply);
            } else {
                res.locals.info = {
                    title: 'MayHienHome',
                    company: '',
                    deputy: '',
                    tax: '',
                    phone: '',
                    fax: '',
                    location: '',
                    email: '',
                    security: '',
                    google: '',
                    facebook: '',
                };
            }
        });

        client.get('links', (err, reply) => {
            if (reply) {
                res.locals.links = JSON.parse(reply);
            } else {
                res.locals.links = [];
            }
        });

        next();
    },
};
