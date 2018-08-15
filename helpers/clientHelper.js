const moment = require('moment');
const RoleHelper = require('./roleHelper');
const Constant = require('../constants/commonConstant');

moment.locale('vi');

module.exports = (res) => {
    res.locals.old = (key, value = '') => {
        if (typeof res.locals.flashMessages !== 'undefined' && res.locals.flashMessages.oldValue) {
            const name = key.split('.');
            if (name.length > 1) {
                return res.locals.flashMessages.oldValue[0][name[0]][name[1]];
            }
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

        return '';
    };

    res.locals.getPageIndex = (page) => {
        page = parseInt(page, 10);

        return (!page || page <= 1) ? 0 : (page - 1) * Constant.limit;
    };

    res.locals.hasRole = RoleHelper.hasRole;

    res.locals.checkValidUser = RoleHelper.checkValidUser;

    res.locals.moment = moment;
};
