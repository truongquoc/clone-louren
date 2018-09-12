const { validationResult } = require('express-validator/check');
const responseHelper = require('../../../helpers/responseHelper');
const RequestRepositoryClass = require('../repositories/RequestRepository');

const RequestRepository = new RequestRepositoryClass();

const create = (req, res) => {
    res.render('modules/requests/client/create');
};

const store = async (req, res, next) => {
    const data = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('errors', errors.mapped());
        req.flash('oldValue', data);
        return res.redirectBack();
    }
    try {
        await RequestRepository.create(data);
        req.flash('success', 'Gửi tin nhắn thành công');

        return res.redirectBack();
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

module.exports = {
    create,
    store,
};
