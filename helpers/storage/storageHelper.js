const s3Storage = require('./s3StorageHelper');

const storage = (location) => {
    switch (location) {
        case 's3': return {
            upload: s3Storage.upload,
        };
        case 'local': return {};
        default: throw new Error('Location is required');
    }
};

module.exports = { storage };
