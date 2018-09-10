const hasRole = (user, roles) => {
    roles = (typeof roles === 'object') ? roles : [roles];

    return user.roles.find(userRole => roles.indexOf(userRole.name) >= 0);
};

const checkValidUser = (currentUser, userId) => currentUser.id === userId;

const hasRoleOnly = (user, role) => {
    const check = user.roles.find(userRole => userRole.name === role);

    return check && user.roles.length === 1;
};

module.exports = {
    hasRole,
    checkValidUser,
    hasRoleOnly,
};
