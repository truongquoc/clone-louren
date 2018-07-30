const { validationResult } = require('express-validator/check');

const responseHelper = require('../../../helpers/responseHelper');
const UserRepositoryClass = require('../repositories/UserRepository');

const UserRepository = new UserRepositoryClass();

const showRegisterForm = (req, res) => res.render('modules/users/admin/auth/register');

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
        return next(responseHelper.error(e.message));
    }
};

module.exports = { showRegisterForm, register };
