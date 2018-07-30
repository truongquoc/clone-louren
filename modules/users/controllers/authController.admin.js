const { validationResult } = require('express-validator/check');
const responseHelper = require('../../../helpers/responseHelper');
const AuthRepositoryClass = require('../repositories/AuthRepository');

const AuthRepository = new AuthRepositoryClass();

const index = (req, res) => (
    res.render('modules/users/admin/index')
);

const showLoginForm = (req, res) => res.render('modules/users/admin/auth/login');

const login = async (req, res, next) => {
    const data = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('errors', errors.mapped());
        req.flash('oldValue', data);

        return res.redirectBack();
    }
    try {
        const user = await AuthRepository.login(data);
        if (user) {
            req.session.cUser = {
                id: user.id,
                roles: user.roles,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                slug: user.slug,
                createdAt: user.createdAt,
            };

            return res.redirect('/admin');
        }
        req.flash('oldValue', data);
        req.flash('errors', { email: { msg: 'Email hoặc mật khẩu không chính xác' } });

        return res.redirectBack();
    } catch (e) {
        return next(responseHelper.error(e.message));
    }
};

module.exports = { index, showLoginForm, login };
