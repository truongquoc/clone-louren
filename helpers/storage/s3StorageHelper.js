require('dotenv/config');
const AWS = require('aws-sdk');
const url = require('url');

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
        ContentType: 'binary',
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
    let { pathname } = url.parse(path);
    pathname = pathname.substr(1);
    const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: pathname,
    };
    s3.deleteObject(params, () => {});
}

module.exports = { upload, destroy };
