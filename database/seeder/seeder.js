const Listr = require('listr');
require('dotenv/config');
const mongoose = require('mongoose');
const { dbUrl } = require('../../config/config');
const { dropRequestsTable, fakeRequests } = require('./requests/requestsSeeder');

mongoose.Promise = global.Promise;
mongoose.connect(dbUrl, { useNewUrlParser: true });
mongoose.connection.on('error', (err) => {
    if (err) {
        throw new Error(`Unable to connect to database: ${err.toString()}`);
    }
});

const pumpItUp = () => ([
    ...[
        {
            title: 'Drop requests table👌',
            task: async () => {
                await dropRequestsTable();
            },
        },
        {
            title: 'Create simple data for Request model👌',
            task: async () => {
                await fakeRequests();
            },
        },
    ],
]);

async function kickoff(tasks) {
    await tasks.run();
    process.exit();
}

const pumpIt = pumpItUp();
kickoff(new Listr(pumpIt));
