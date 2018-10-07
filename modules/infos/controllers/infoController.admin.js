const redis = require('redis');
const { validationResult } = require('express-validator/check');
const { promisify } = require('util');
const InfoRepositoryClass = require('../repositories/infoRepository');
const responseHelper = require('../../../helpers/responseHelper');

const infoRepository = new InfoRepositoryClass();
const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);

module.exports = {
    manage: async (req, res) => {
        const infos = await infoRepository.show();

        let info = infos.length !== 0 ? JSON.parse(JSON.stringify(infos[0])) : {};
        const [
            about,
            aboutEn,
            purchaseMethod,
            purchaseMethodEn,
            payments,
            paymentsEn,
            deliveryPolicy,
            deliveryPolicyEn,
            policyToChange,
            policyToChangeEn,
            warranty,
            warrantyEn,
            privacyPolicy,
            privacyPolicyEn,
        ] = await Promise.all([
            getAsync('about'),
            getAsync('aboutEn'),
            getAsync('purchaseMethod'),
            getAsync('purchaseMethodEn'),
            getAsync('payments'),
            getAsync('paymentsEn'),
            getAsync('deliveryPolicy'),
            getAsync('deliveryPolicyEn'),
            getAsync('policyToChange'),
            getAsync('policyToChangeEn'),
            getAsync('warranty'),
            getAsync('warrantyEn'),
            getAsync('privacyPolicy'),
            getAsync('privacyPolicyEn'),
        ]);

        info = Object.assign({
            about,
            aboutEn,
            purchaseMethod,
            purchaseMethodEn,
            payments,
            paymentsEn,
            deliveryPolicy,
            deliveryPolicyEn,
            policyToChange,
            policyToChangeEn,
            warranty,
            warrantyEn,
            privacyPolicy,
            privacyPolicyEn,
        }, info);

        return res.render('modules/infos/admin/create', {
            info,
        });
    },

    store: async (req, res, next) => {
        const data = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash('oldValue', data);
            req.flash('errors', errors.mapped());
            return res.redirectBack();
        }

        try {
            const info = await infoRepository.show();
            let detail;

            if (info.length) {
                detail = await infoRepository.update(info[0]._id, data);
                detail = JSON.stringify(detail);
            } else {
                detail = await infoRepository.create(data);
                detail = JSON.stringify(detail);
            }

            client.set('info', detail);

            client.set('about', data.about);
            client.set('aboutEn', data.aboutEn);

            client.set('purchaseMethod', data.purchaseMethod);
            client.set('purchaseMethodEn', data.purchaseMethodEn);

            client.set('payments', data.payments);
            client.set('paymentsEn', data.paymentsEn);

            client.set('deliveryPolicy', data.deliveryPolicy);
            client.set('deliveryPolicyEn', data.deliveryPolicyEn);

            client.set('policyToChange', data.policyToChange);
            client.set('policyToChangeEn', data.policyToChangeEn);

            client.set('warranty', data.warranty);
            client.set('warrantyEn', data.warrantyEn);

            client.set('privacyPolicy', data.privacyPolicy);
            client.set('privacyPolicyEn', data.privacyPolicyEn);

            req.flash('success', 'Cập nhật thông tin thành công');

            return res.redirect('/admin/infos');
        } catch (e) {
            next(responseHelper.error(e.message));
        }
    },
};
