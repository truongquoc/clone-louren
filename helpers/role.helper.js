const hasRole = (user, roles) => {
    roles = (typeof roles === 'object') ? roles : [roles];

    return user.roles.find(userRole => {
        return roles.indexOf(userRole.name) >= 0;
    });
};

const checkValidUser = (currentUser, userId) => {
    return currentUser.id === userId;
};

module.exports = { hasRole, checkValidUser };