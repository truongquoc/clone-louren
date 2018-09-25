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

        const info = infos.length !== 0 ? infos[0] : {};
        const [about, policy, courage] = await Promise.all([
            getAsync('about'),
            getAsync('policy'),
            getAsync('courage'),
        ]);

        info.about = about !== null ? about : '';
        info.policy = policy !== null ? policy : '';
        info.courage = courage !== null ? courage : '';

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

            if (info.length) {
                const detail = await infoRepository.update(info[0]._id, data);
                const infoJson = JSON.stringify(detail);

                client.set('info', infoJson);
                client.set('about', data.about);
                client.set('policy', data.policy);
                client.set('courage', data.courage);

                req.flash('oldValue', data);
                req.flash('success', 'Cập nhật thông tin thành công');

                return res.redirect('/admin/infos');
            }

            const detail = await infoRepository.create(data);
            const infoJson = JSON.stringify(detail);

            client.set('info', infoJson);
            client.set('about', data.about);
            client.set('policy', data.policy);
            client.set('courage', data.courage);

            req.flash('oldValue', data);
            req.flash('success', 'Cập nhật thông tin thành công');

            return res.redirect('/admin/infos');
        } catch (e) {
            next(responseHelper.error(e.message));
        }
    },
};
