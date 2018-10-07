const redis = require('redis');
const { promisify } = require('util');
const responseHelper = require('../../../helpers/responseHelper');

const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);

const linksData = {
    purchaseMethod: {
        _id: 'purchaseMethod',
        key: 'purchase-method',
        name: 'Phương thức mua hàng',
        link: 'phuong-thuc-mua-hang',
        show: true,
    },
    payments: {
        _id: 'payments',
        key: 'payments',
        name: 'Hình thức thanh toán',
        link: 'hinh-thuc-thanh-toan',
        show: true,
    },
    deliveryPolicy: {
        _id: 'deliveryPolicy',
        key: 'delivery-policy',
        name: 'Chính sách giao nhận',
        link: 'chinh-sach-giao-nhan',
        show: true,
    },
    policyToChange: {
        _id: 'policyToChange',
        key: 'policy-to-change',
        name: 'Quy định đổi trả',
        link: 'quy-dinh-doi-tra',
        show: true,
    },
    warranty: {
        _id: 'warranty',
        key: 'warranty',
        name: 'Chế độ bảo hành',
        link: 'che-do-bao-hanh',
        show: true,
    },
    privacyPolicy: {
        _id: 'privacyPolicy',
        key: 'privacy-policy',
        name: 'Chính sách bảo mật',
        link: 'chinh-sach-bao-mat',
        show: true,
    },
};

module.exports = {
    index: async (req, res, next) => {
        try {
            let links = await getAsync('links');
            if (links) {
                links = JSON.parse(links);
            } else {
                links = Object.values(linksData);
            }

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

            const links = [];
            for (let i = 0; i < ids.length; i += 1) {
                if (linksData[ids[i]]) {
                    links.push(linksData[ids[i]]);
                }
                links[i].show = shows[i];
            }
            const linksJson = JSON.stringify(links);
            client.set('links', linksJson);

            req.flash('success', 'Cập nhật thành công');

            return res.status(200).json({ message: 'success' });
        } catch (error) {
            return res.status(500).json({ message: 'error' });
        }
    },
};
