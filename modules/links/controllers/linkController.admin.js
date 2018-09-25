const redis = require('redis');
const { promisify } = require('util');
const responseHelper = require('../../../helpers/responseHelper');

const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);

module.exports = {
    index: async (req, res, next) => {
        try {
            let links = await getAsync('links');
            links = links !== null ? JSON.parse(links) : null;

            return res.render('modules/links/admin/list', {
                links,
            });
        } catch (e) {
            next(responseHelper.error(e.message));
        }
    },

    updateStt: async (req, res) => {
        try {
            const { ids, shows } = req.body;
            const data = {
                gt: {
                    _id: 'gt',
                    name: 'Giới thiệu',
                    link: 'gioi-thieu',
                    show: 'show',
                },
                cs: {
                    _id: 'cs',
                    name: 'Chính sách bán hàng',
                    link: 'chinh-sach',
                    show: 'show',
                },
                ck: {
                    _id: 'ck',
                    name: 'Cam kết',
                    link: 'cam-ket',
                    show: 'show',
                },
            };

            const links = [];
            for (let i = 0; i < ids.length; i += 1) {
                if (ids[i] === 'gt') {
                    links.push(data.gt);
                }

                if (ids[i] === 'cs') {
                    links.push(data.cs);
                }

                if (ids[i] === 'ck') {
                    links.push(data.ck);
                }

                links[i].show = shows[i];
            }

            const linksJson = JSON.stringify(links);

            client.set('links', linksJson);
            req.flash('success', 'Cập nhật thành công');
            res.status(200).json({ message: 'success' });
        } catch (error) {
            return res.status(500).json({ message: 'error' });
        }
    },
};
