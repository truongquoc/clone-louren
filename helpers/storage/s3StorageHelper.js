require('dotenv/config');
const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
});
const s3 = new AWS.S3();

function upload(path, body, readType) {
    const params = {
        Bucket: process.env.AWS_BUCKET,
        Body: body,
        Key: path,
        ACL: readType,
    };
    return new Promise((resolve, reject) => {
        s3.upload(params, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data.Location);
        });
    });
}

function destroy(path) {
    const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: path,
    };
    s3.deleteObject(params);
}

module.exports = { upload, destroy };
