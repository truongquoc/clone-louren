const moment = require('moment');
const RoleHelper = require('./roleHelper');
const Constant = require('../constants/commonConstant');

module.exports = (res) => {
    res.locals.old = (key, value) => {
        if (typeof res.locals.flashMessages !== 'undefined' && res.locals.flashMessages.oldValue) {
            return res.locals.flashMessages.oldValue[0][key];
        }
        return value;
    };

    res.locals.errors = (key) => {
        if (typeof res.locals.flashMessages !== 'undefined' && res.locals.flashMessages.errors) {
            const { errors } = res.locals.flashMessages;
            if (errors[0] && errors[0][key]) {
                return errors[0][key].msg;
            }
        }

        return null;
    };

    res.locals.getPageIndex = (page) => {
        page = parseInt(page, 10);

        return (!page || page <= 1) ? 0 : (page - 1) * Constant.limit;
    };

    res.locals.hasRole = RoleHelper.hasRole;

    res.locals.checkValidUser = RoleHelper.checkValidUser;

    res.locals.moment = moment;
};
