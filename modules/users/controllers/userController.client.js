const { validationResult } = require('express-validator/check');
const UserRepositoryClass = require('../repositories/UserRepository');

const UserRepository = new UserRepositoryClass();

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
        await UserRepository.updateProfile(data, req.session.cUser._id, !!req.session.cUser.email);
        return res.redirectBack();
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

module.exports = {
    showProfile,
    updateProfile,
};
