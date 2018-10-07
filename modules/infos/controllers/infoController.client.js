const i18n = require('i18n');
const redis = require('redis');
const { promisify } = require('util');

const responseHelper = require('../../../helpers/responseHelper');

const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);

const about = async (req, res, next) => {
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
};

const purchaseMethod = async (req, res, next) => {
    try {
        const key = 'purchase-method';
        let content = '';
        const locale = i18n.getLocale(req);
        if (locale === 'vi') {
            content = await getAsync('purchaseMethod');
        } else if (locale === 'en') {
            content = await getAsync('purchaseMethodEn');
        }

        return res.render('modules/infos/client/detail', {
            content,
            key,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const payments = async (req, res, next) => {
    try {
        const key = 'payments';
        let content = '';
        const locale = i18n.getLocale(req);
        if (locale === 'vi') {
            content = await getAsync('payments');
        } else if (locale === 'en') {
            content = await getAsync('paymentsEn');
        }

        return res.render('modules/infos/client/detail', {
            content,
            key,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const deliveryPolicy = async (req, res, next) => {
    try {
        const key = 'delivery-policy';
        let content = '';
        const locale = i18n.getLocale(req);
        if (locale === 'vi') {
            content = await getAsync('deliveryPolicy');
        } else if (locale === 'en') {
            content = await getAsync('deliveryPolicyEn');
        }

        return res.render('modules/infos/client/detail', {
            content,
            key,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const policyToChange = async (req, res, next) => {
    try {
        const key = 'policy-to-change';
        let content = '';
        const locale = i18n.getLocale(req);
        if (locale === 'vi') {
            content = await getAsync('policyToChange');
        } else if (locale === 'en') {
            content = await getAsync('policyToChangeEn');
        }

        return res.render('modules/infos/client/detail', {
            content,
            key,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const warranty = async (req, res, next) => {
    try {
        const key = 'warranty';
        let content = '';
        const locale = i18n.getLocale(req);
        if (locale === 'vi') {
            content = await getAsync('warranty');
        } else if (locale === 'en') {
            content = await getAsync('warrantyEn');
        }

        return res.render('modules/infos/client/detail', {
            content,
            key,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const privacyPolicy = async (req, res, next) => {
    try {
        const key = 'privacy-policy';
        let content = '';
        const locale = i18n.getLocale(req);
        if (locale === 'vi') {
            content = await getAsync('privacyPolicy');
        } else if (locale === 'en') {
            content = await getAsync('privacyPolicyEn');
        }

        return res.render('modules/infos/client/detail', {
            content,
            key,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

module.exports = {
    about,
    purchaseMethod,
    payments,
    deliveryPolicy,
    policyToChange,
    warranty,
    privacyPolicy,
};
