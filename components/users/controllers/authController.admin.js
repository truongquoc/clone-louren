const { validationResult } = require('express-validator/check');

const ResponseHelper = require('../../../helpers/response.helper');
const AuthRepository = new (require('../repositories/authRepository'));

const index = (req, res) => {
    return res.render('components/users/admin/index');
};

const showLoginForm = (req, res) => {
    return res.render('components/users/admin/auth/login');
};

const login = async (req, res, next) => {
    const data = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('errors', errors.mapped());
        req.flash('oldValue', data);

        return res.redirectBack();
    }
    try {
        let user = await AuthRepository.login(data);
        if (user) {
            req.session.cUser = {
                id: user.id,
                roles: user.roles,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                slug: user.slug,
                createdAt: user.createdAt
            };

            return res.redirect('/admin');
        }
        req.flash('oldValue', data);
        req.flash('errors', { email: { msg: 'Email hoặc mật khẩu không chính xác' } });

        return res.redirectBack();
    } catch (e) {
        next(ResponseHelper.error(e.message));
    }
};

module.exports = { index, showLoginForm, login };