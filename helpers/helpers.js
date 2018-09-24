const moment = require('moment');
const RoleHelper = require('./roleHelper');
const Constant = require('../constants/commonConstant');

moment.locale('vi');

module.exports = (res) => {
    res.locals.old = (key, value = '') => {
        if (typeof res.locals.flashMessages !== 'undefined' && res.locals.flashMessages.oldValue) {
            const name = key.split('.');
            if (name.length > 1) {
                return res.locals.flashMessages.oldValue[0][name[0]][name[1]] || value;
            }
            return res.locals.flashMessages.oldValue[0][key] || value;
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

    res.locals.infoRedis = (title, data, item) => {
        if (data[item] !== '') {
            return `${title}: ${data[item]}`;
        }

        return '';
    };

    res.locals.titleRedis = data => (typeof data.title !== 'undefined' ? data.title : 'Mây Hiên Home');

    res.locals.getPageIndex = (page) => {
        page = parseInt(page, 10);

        return (!page || page <= 1) ? 0 : (page - 1) * Constant.limit;
    };

    res.locals.strLimit = (string, limit, end = '...') => {
        if (string.length > limit) {
            return `${string.substr(0, limit)}${end}`;
        }

        return string;
    };

    res.locals.formatPrice = (number) => {
        number = parseInt(number, 10).toLocaleString('de-DE').replace(/,/g, '.');
        return number;
    };

    res.locals.valInfo = (key, info) => {
        if (typeof res.locals.flashMessages !== 'undefined' && res.locals.flashMessages.oldValue) {
            const name = key.split('.');
            if (name.length > 1) {
                return res.locals.flashMessages.oldValue[0][name[0]][name[1]];
            }
            return res.locals.flashMessages.oldValue[0][key];
        }

        if (info[key]) {
            return info[key];
        }

        return '';
    };

    res.locals.hasRole = RoleHelper.hasRole;

    res.locals.hasRoleOnly = RoleHelper.hasRoleOnly;

    res.locals.checkValidUser = RoleHelper.checkValidUser;

    res.locals.moment = moment;
};
