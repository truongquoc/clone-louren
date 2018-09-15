require('dotenv/config');
const Role = require('../../../modules/users/models/Role');

async function dropRolesTable() {
    await Role.remove({}, (err) => {});
}

async function fakeRoles() {
    try {
        const items = [
            {
                name: 'User',
                description: 'Person that can only create property article in client',
            },
            {
                name: 'Blogger',
                description: 'A person who can only write blog article',
            },
            {
                name: 'Manager',
                description: 'A person who can decentralize user',
            },
            {
                name: 'Admin',
                description: 'A person who can do everything in this website',
            },
        ];
        await Role.create(items);
    } catch (e) {
        throw e;
    }
}

module.exports = { dropRolesTable, fakeRoles };
