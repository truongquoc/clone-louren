const Listr = require('listr');
require('dotenv/config');
const mongoose = require('mongoose');
const { dbUrl } = require('../../config/config');
const { dropRolesTable, fakeRoles } = require('./users/rolesSeeder.prod');
const { dropUsersTable, fakeUsers } = require('./users/userSeeder.prod');
const { dropBlogCategoriesTable } = require('./blog/categoriesSeeder');
const { dropBlogTagsTable } = require('./blog/tagsSeeder');
const { dropBlogArticlesTable } = require('./blog/articlesSeeder');
const { dropProductTypesTable } = require('./products/productTypesSeeder');
const { dropProductsTable } = require('./products/productsSeeder');
const { dropProductBillsTable } = require('./products/productBillSeeder');
const { dropBillsTable } = require('./products/billsSeeder');
const { dropCartsTable } = require('./products/cartsSeeder');

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
            title: 'Drop blog tags table👌',
            task: async () => {
                await dropBlogTagsTable();
            },
        },
        {
            title: 'Drop blog articles table👌',
            task: async () => {
                await dropBlogArticlesTable();
            },
        },
        {
            title: 'Drop product types table👌',
            task: async () => {
                await dropProductTypesTable();
            },
        },
         {
            title: 'Drop products table👌',
            task: async () => {
                await dropProductsTable();
            },
        },
        {
            title: 'Drop product bills table👌',
            task: async () => {
                await dropProductBillsTable();
            },
        },
        {
            title: 'Drop bills table👌',
            task: async () => {
                await dropBillsTable();
            },
        },
        {
            title: 'Drop carts table👌',
            task: async () => {
                await dropCartsTable();
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
