const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);


module.exports = {
    getRedis: async (req, res, next) => {
        const info = await getAsync('info');

        if (info) {
            res.locals.info = JSON.parse(info);
        } else {
            res.locals.info = {
                title: 'Mây Hiên Home',
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

        const links = await getAsync('links');

        if (links) {
            res.locals.links = JSON.parse(links);
        } else {
            res.locals.links = [];
        }

        next();
    },
};
