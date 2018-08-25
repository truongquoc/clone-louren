const { validationResult } = require('express-validator/check');
const responseHelper = require('../../../helpers/responseHelper');
const AddressRepositoryClass = require('../repositories/AddressRepository');

const AddressRepository = new AddressRepositoryClass();

const store = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json(responseHelper.error(errors.mapped(), 400));
    }
    try {
        const data = req.body;
        const result = await AddressRepository.store(data, req.params.id);

        return res.json(responseHelper.success(result));
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

const update = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json(responseHelper.error(errors.mapped(), 400));
    }
    try {
        const data = req.body;
        await AddressRepository.update(data);

        return res.json(responseHelper.success(true));
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

const destroy = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json(responseHelper.error(errors.mapped(), 400));
    }
    try {
        const data = req.body;
        await AddressRepository.delete(data);

        return res.json(responseHelper.success(true));
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

module.exports = {
    store,
    update,
    destroy,
};
