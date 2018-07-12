const moment = require('moment');
const RoleHelper = require('./role.helper');

module.exports = function (res) {
    res.locals.old = (key, value) => {
        if (typeof res.locals.flashMessages !== 'undefined' && res.locals.flashMessages.oldValue) {
            return res.locals.flashMessages.oldValue[0][key];
        }
        return value;
    };

    res.locals.hasRole = RoleHelper.hasRole;

    res.locals.checkValidUser = RoleHelper.checkValidUser;

    res.locals.moment = moment;
};