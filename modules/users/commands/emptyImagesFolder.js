const { promisify } = require('util');
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');

const unlinkAsync = promisify(fs.unlink);

function emptyImagesFolder() {
    const directory = 'public/tmp/images';
    cron.schedule('0 0-23/12 * * *', async () => {
        try {
            fs.readdir(directory, (err, files) => {
                if (err) {
                    throw err;
                }
                files.forEach((file) => {
                    unlinkAsync(path.join(directory, file));
                });
            });
        } catch (e) {
            throw e;
        }
    });
}

module.exports = emptyImagesFolder;
