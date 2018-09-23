const redis = require('redis');
const { validationResult } = require('express-validator/check');
const LinkRepositoryClass = require('../repositories/linkRepository');
const responseHelper = require('../../../helpers/responseHelper');

const linkRepository = new LinkRepositoryClass();
const client = redis.createClient();

module.exports = {
    create: (req, res) => {
        return res.render('modules/links/admin/create');
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
            const stt = await linkRepository.count();

            data.stt = stt;
            await linkRepository.create(data);
            const links = await linkRepository.find();
            const linksJson = JSON.stringify(links);

            client.set('links', linksJson);

            req.flash('success', 'Cập nhật liên kết thành công');

            return res.redirect('/admin/links');
        } catch (e) {
            next(responseHelper.error(e.message));
        }
    },

    index: async (req, res, next) => {
        try {
            const links = await linkRepository.show();

            return res.render('modules/links/admin/list', {
                links,
            });
        } catch (e) {
            next(responseHelper.error(e.message));
        }
    },

    edit: async (req, res, next) => {
        try {
            const { id } = req.params;

            const link = await linkRepository.findById(id);

            return res.render('modules/links/admin/edit', {
                link,
            });
        } catch (e) {
            next(responseHelper.error(e.message));
        }
    },

    update: async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = req.body;

            const findExist = await linkRepository.findByTitle(data.title);

            if (findExist) {
                if (findExist._id.toString() === id) {
                    await linkRepository.update(id, data);
                    const links = await linkRepository.find();
                    const linksJson = JSON.stringify(links);

                    client.set('links', linksJson);
                    req.flash('success', 'Cập nhật liên kết thành công');

                    return res.redirect('/admin/links');
                }

                const errors = [{
                    title: { msg: 'Tiêu đề đã tồn tại' },
                }];
                req.flash('oldValue', data);
                req.flash('errors', errors);
                return res.redirectBack();
            }

            await linkRepository.update(id, data);
            const links = await linkRepository.find();
            const linksJson = JSON.stringify(links);

            client.set('links', linksJson);
            req.flash('success', 'Cập nhật liên kết thành công');

            return res.redirect('/admin/links');
        } catch (e) {
            next(responseHelper.error(e.message));
        }
    },

    delete: (req, res) => {
        try {
            const { id } = req.body;

            linkRepository.delete(id).then(async () => {
                const links = await linkRepository.find();
                const linksJson = JSON.stringify(links);

                client.set('links', linksJson);
                req.flash('success', 'Xóa liên kết thành công');
                res.status(200).json({ message: 'success' });
            }, (error) => {
                throw error;
            });
        } catch (error) {
            return res.status(500).json({ message: 'error' });
        }
    },

    updateStt: async (req, res) => {
        try {
            const { ids } = req.body;

            await Promise.all(ids.map((id, stt) => linkRepository.update(id, { stt })));

            const links = await linkRepository.find();
            const linksJson = JSON.stringify(links);

            client.set('links', linksJson);
            req.flash('success', 'Cập nhật thành công');
            res.status(200).json({ message: 'success' });
        } catch (error) {
            return res.status(500).json({ message: 'error' });
        }
    }
};
