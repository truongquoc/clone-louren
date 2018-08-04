require('dotenv/config');
const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
});
const s3 = new AWS.S3();

function upload(path, body, readType, callback) {
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

module.exports = { upload };
