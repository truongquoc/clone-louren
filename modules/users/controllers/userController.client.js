const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const i18n = require('i18n');

const responseHelper = require('../../../helpers/responseHelper');
const UserRepositoryClass = require('../repositories/UserRepository');

const UserRepository = new UserRepositoryClass();

const index = (req, res) => res.render('modules/users/client/index');

const showProfile = async (req, res, next) => {
    try {
        const user = await UserRepository.getUserWithRoles({
            name: 'slug',
            value: req.session.cUser.slug,
        });
        return res.render('modules/users/client/profile', {
            user,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const updateProfile = async (req, res, next) => {
    const data = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('oldValue', data);
        req.flash('errors', errors.mapped());
        return res.redirectBack();
    }
    try {
        if (data.password) {
            const user = await UserRepository.getById(req.session.cUser._id);
            if (!bcrypt.compareSync(data.password, user.password)) {
                req.flash('oldValue', data);
                req.flash('errors', {
                    password: {
                        msg: i18n.__('user.auth.password.not-valid'),
                    },
                });
                return res.redirectBack();
            }
        }
        await UserRepository.updateProfile(data, req.session.cUser._id, !!req.session.cUser.email);
        return res.redirectBack();
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

module.exports = {
    index,
    showProfile,
    updateProfile,
};
