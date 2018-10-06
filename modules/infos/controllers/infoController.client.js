const i18n = require('i18n');
const redis = require('redis');
const { promisify } = require('util');
const responseHelper = require('../../../helpers/responseHelper');

const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);

module.exports = {
    about: async (req, res, next) => {
        try {
            let content = '';
            const locale = i18n.getLocale(req);
            if (locale === 'vi') {
                content = await getAsync('about');
            } else if (locale === 'en') {
                content = await getAsync('aboutEn');
            }

            return res.render('modules/infos/client/about', {
                content,
            });
        } catch (e) {
            next(responseHelper.error(e.message));
        }
    },

    policy: async (req, res, next) => {
        try {
            const key = 'policy';
            let content = '';
            const locale = i18n.getLocale(req);
            if (locale === 'vi') {
                content = await getAsync('policy');
            } else if (locale === 'en') {
                content = await getAsync('policyEn');
            }

            return res.render('modules/infos/client/policy', {
                content,
                key,
            });
        } catch (e) {
            next(responseHelper.error(e.message));
        }
    },

    courage: async (req, res, next) => {
        try {
            const key = 'courage';
            let content = '';
            const locale = i18n.getLocale(req);
            if (locale === 'vi') {
                content = await getAsync('courage');
            } else if (locale === 'en') {
                content = await getAsync('courageEn');
            }

            return res.render('modules/infos/client/policy', {
                content,
                key,
            });
        } catch (e) {
            next(responseHelper.error(e.message));
        }
    },
};
