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
                const name = key.split('.');
                if (name.length > 1) {
                    return errors[0][name[0]][name[1]].msg;
                }
                return errors[0][key].msg;
            }
        }

        return '';
    };

    res.locals.getPageIndex = (page) => {
        page = parseInt(page, 10);

        return (!page || page <= 1) ? 0 : (page - 1) * Constant.limit;
    };

    res.locals.strLimit = (string, limit, end = '...') => `${string.substr(0, limit)}${end}`;

    res.locals.formatPrice = (number) => {
        number = parseFloat(number);
        let string = '';
        const number1 = number / 1000000;
        if (number1 >= 1) {
            string += `${Math.floor(number1)}.`;
            number -= Math.floor(number1) * 1000000;
        }
        const number2 = number / 1000;
        if (number2 >= 1) {
            string += `${Math.floor(number2)}.`;
            number -= Math.floor(number2) * 1000;
        }
        string += number;

        return string;
    };

    res.locals.hasRole = RoleHelper.hasRole;

    res.locals.hasRoleOnly = RoleHelper.hasRoleOnly;

    res.locals.checkValidUser = RoleHelper.checkValidUser;

    res.locals.moment = moment;
};
