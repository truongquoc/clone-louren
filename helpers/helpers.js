const moment = require('moment');
const RoleHelper = require('./role.helper');

module.exports = function (res) {
    res.locals.old = (key, value) => {
        if (typeof res.locals.flashMessages !== 'undefined' && res.locals.flashMessages.oldValue) {
            return res.locals.flashMessages.oldValue[0][key];
        }
        return value;
    };

    res.locals.errors = (key) => {
        if (typeof res.locals.flashMessages !== 'undefined' && res.locals.flashMessages.errors) {
            const errors = res.locals.flashMessages.errors;
            if (errors[0] && errors[0][key]) {
                return errors[0][key].msg;
            }
        }

        return null;
    };

    res.locals.hasRole = RoleHelper.hasRole;

    res.locals.checkValidUser = RoleHelper.checkValidUser;

    res.locals.moment = moment;
};