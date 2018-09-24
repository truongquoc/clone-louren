
const redis = require('redis');
const { promisify } = require('util');
const responseHelper = require('../../../helpers/responseHelper');

const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);

module.exports = {
    about: async (req, res, next) => {
        try {
            const about = await getAsync('about');

            const content = about !== null ? about : '';

            return res.render('modules/infos/client/about', {
                content,
            });
        } catch (e) {
            next(responseHelper.error(e.message));
        }
    },

    policy: async (req, res, next) => {
        try {
            const title = 'Chính sách bán hàng';
            const policy = await getAsync('policy');

            const content = policy !== null ? policy : '';

            return res.render('modules/infos/client/policy', {
                content, title,
            });
        } catch (e) {
            next(responseHelper.error(e.message));
        }
    },

    courage: async (req, res, next) => {
        try {
            const title = 'Cam kết';
            const courage = await getAsync('courage');

            const content = courage !== null ? courage : '';

            return res.render('modules/infos/client/policy', {
                content, title,
            });
        } catch (e) {
            next(responseHelper.error(e.message));
        }
    },
};
