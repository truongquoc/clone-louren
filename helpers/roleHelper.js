const hasRole = (user, roles) => {
    roles = (typeof roles === 'object') ? roles : [roles];

    return user.roles.find(userRole => roles.indexOf(userRole.name) >= 0);
};

const checkValidUser = (currentUser, userId) => currentUser.id === userId;

module.exports = { hasRole, checkValidUser };
