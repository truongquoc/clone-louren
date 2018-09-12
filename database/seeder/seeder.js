const Listr = require('listr');
require('dotenv/config');
const mongoose = require('mongoose');
const { dbUrl } = require('../../config/config');
const { dropRolesTable, fakeRoles } = require('./users/rolesSeeder');
const { dropUsersTable, fakeUsers } = require('./users/usersSeeder');
const { dropBlogCategoriesTable, fakeBlogCategories } = require('./blog/categoriesSeeder');
const { dropBlogTagsTable, fakeBlogTags } = require('./blog/tagsSeeder');
const { dropBlogArticlesTable, fakeBlogArticles } = require('./blog/articlesSeeder');

mongoose.Promise = global.Promise;
mongoose.connect(dbUrl, { useNewUrlParser: true });
mongoose.connection.on('error', (err) => {
    if (err) {
        throw new Error(`Unable to connect to database: ${err.toString()}`);
    }
});

const pumpItUp = () => [
    ...[
        {
            title: 'Drop roles table👌',
            task: async () => {
                await dropRolesTable();
            },
        },
        {
            title: 'Create simple data for Role model👌',
            task: async () => {
                await fakeRoles();
            },
        },
        {
            title: 'Drop users table👌',
            task: async () => {
                await dropUsersTable();
            },
        },
        {
            title: 'Create simple data for User model👌',
            task: async () => {
                await fakeUsers();
            },
        },
        {
            title: 'Drop blog categories table👌',
            task: async () => {
                await dropBlogCategoriesTable();
            },
        },
        {
            title: 'Create simple data for BlogCategory model👌',
            task: async () => {
                await fakeBlogCategories();
            },
        },
        {
            title: 'Drop blog tags table👌',
            task: async () => {
                await dropBlogTagsTable();
            },
        },
        {
            title: 'Create simple data for BlogTag model👌',
            task: async () => {
                await fakeBlogTags();
            },
        },
        {
            title: 'Drop blog articles table👌',
            task: async () => {
                await dropBlogArticlesTable();
            },
        },
        {
            title: 'Create simple data for BlogArticle model👌',
            task: async () => {
                await fakeBlogArticles();
            },
        },
    ],
];

async function kickoff(tasks) {
    await tasks.run();
    process.exit();
}

const pumpIt = pumpItUp();
kickoff(new Listr(pumpIt));
