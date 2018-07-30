require('dotenv/config');
const seeder = require('mongoose-seed');

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
        name: 'Blog manager',
        description: 'A person who manage blog',
    },
    {
        name: 'Property writer',
        description: 'A person who can only write property article',
    },
    {
        name: 'Property manager',
        description: 'A person who manage property',
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

const data = [{
    model: 'roles',
    documents: items,
}];

seeder.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
    seeder.loadModels(['./modules/users/models/Role']);
    seeder.clearModels(['roles'], () => {
        seeder.populateModels(data, () => {
            seeder.disconnect();
        });
    });
});
