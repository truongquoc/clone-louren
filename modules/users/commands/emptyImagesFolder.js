const cron = require('node-cron');
const rimraf = require('rimraf');

function emptyImagesFolder() {
    cron.schedule('0 0-23/12 * * *', async () => {
        try {
            rimraf('public/tmp/images', () => {
                console.log('Done empty folder job');
            });
        } catch (e) {
            throw e;
        }
    });
}

module.exports = emptyImagesFolder;
