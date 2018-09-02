const { validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');
const config = require('../../../config/config');
const responseHelper = require('../../../helpers/responseHelper');
const AuthRepositoryClass = require('../repositories/AuthRepository');

const AuthRepository = new AuthRepositoryClass();

const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json(responseHelper.error(errors.mapped(), 400));
    }
    const data = req.body;
    try {
        const user = await AuthRepository.login(data);
        if (!user) {
            return res.json(responseHelper.error('INVALID_EMAIL_OR_PASSWORD'));
        }
        const result = {
            token: jwt.sign({
                user,
            }, config.jwtSecret, { expiresIn: parseInt(config.sessionLifetime, 10) }),
        };

        return res.json(responseHelper.success({ result }));
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

module.exports = {
    login,
};
