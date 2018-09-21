const redis = require('redis');

const client = redis.createClient();

module.exports = {
    getRedis: (req, res, next) => {
        client.get('info', (err, reply) => {
            if (reply) {
                res.locals.info = JSON.parse(reply);
            } else {
                res.locals.info = {
                                    title: 'MyHienHome',
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

        next();
    },
};
