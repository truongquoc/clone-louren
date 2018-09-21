const redis = require('redis');
const { validationResult } = require('express-validator/check');
const InfoRepositoryClass = require('../repositories/infoRepository');
const responseHelper = require('../../../helpers/responseHelper');

const infoRepository = new InfoRepositoryClass();
const client = redis.createClient();

module.exports = {
    manage: async (req, res) => {
        const info = await infoRepository.show();

        if (info.length) {
            req.flash('oldValue', info[0]);
        }
        return res.render('modules/infos/admin/create');
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

                req.flash('oldValue', data);
                req.flash('success', 'Cập nhật thông tin thành công');

                return res.redirect('/admin/infos');
            }

            const detail = await infoRepository.create(data);
            const infoJson = JSON.stringify(detail);

            client.set('info', infoJson);

            req.flash('oldValue', data);
            req.flash('success', 'Cập nhật thông tin thành công');

            return res.redirect('/admin/infos');
        } catch (e) {
            next(responseHelper.error(e.message));
        }
    },
};
