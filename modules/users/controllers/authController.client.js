const jwt = require('jsonwebtoken');
const config = require('../../../config/config');
const passport = require('../../../config/passport');
const responseHelper = require('../../../helpers/responseHelper');
const AuthRepositoryClass = require('../repositories/AuthRepository');

const AuthRepository = new AuthRepositoryClass();

const facebookLogin = (req, res, next) => {
    passport.authenticate('facebook', {}, async (err, data) => {
        if (!data) {
            return next(responseHelper.error());
        }
        try {
            let user = await AuthRepository.findUserWithSocialMedia({
                name: 'facebook',
                id: data.id,
            });
            if (user && user.deletedAt) {
                req.flash('message', 'Tài khoản này đã bị chặn');
                return res.redirect('/login');
            }
            if (!user) {
                user = await AuthRepository.facebookLogin(data);
            }
            req.session.cUser = {
                _id: user.id,
                roles: user.roles,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                slug: user.slug,
                createdAt: user.createdAt,
                token: jwt.sign({
                    user,
                }, config.jwtSecret, { expiresIn: parseInt(config.sessionLifetime, 10) }),
            };
            return res.redirect('/');
        } catch (e) {
            next(responseHelper.error(e.message));
        }
    })(req, res, next);
};

const googleLogin = (req, res, next) => {
    passport.authenticate('google', {}, async (err, data) => {
        if (!data) {
            return next(responseHelper.error());
        }
        try {
            let user = await AuthRepository.findUserWithSocialMedia({
                name: 'google',
                id: data.id,
                email: data.emails[0].value,
            });
            if (user && user.deletedAt) {
                req.flash('message', 'Tài khoản này đã bị chặn');
                return res.redirect('/login');
            }
            if (!user) {
                user = await AuthRepository.googleLogin(data);
            }
            req.session.cUser = {
                _id: user.id,
                roles: user.roles,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                slug: user.slug,
                createdAt: user.createdAt,
                token: jwt.sign({
                    user,
                }, config.jwtSecret, { expiresIn: parseInt(config.sessionLifetime, 10) }),
            };
            return res.redirect('/');
        } catch (e) {
            next(responseHelper.error(e.message));
        }
    })(req, res, next);
};

module.exports = {
    facebookLogin,
    googleLogin,
};
