const { validationResult } = require('express-validator/check');

const ResponseHelper = require('../../../helpers/response.helper');
const UserRepository = new (require('../repositories/userRepository'))();

const showRegisterForm = (req, res) => {
    return res.render('components/users/admin/auth/register');
};

const register = async (req, res, next) => {
    const data = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('oldValue', data);
        req.flash('errors', errors.mapped());

        return res.redirectBack();
    }
    try {
        await UserRepository.create(data);

        return res.redirect('/admin/login');
    } catch (e) {
        console.log(e.message);
        next(ResponseHelper.error(e.message));
    }
};

module.exports = { showRegisterForm, register };