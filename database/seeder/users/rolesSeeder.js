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
                name: 'Blog Manager',
                description: 'A person who manage blog',
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
        // for (let i = 0; i < items.length; i += 1) {
        //     await Role.create({
        //         name: items[i].name,
        //         description: items[i].description,
        //     });
        // }
    } catch (e) {
        throw e;
    }
}

module.exports = { dropRolesTable, fakeRoles };
