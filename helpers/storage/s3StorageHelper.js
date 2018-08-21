require('dotenv/config');
const AWS = require('aws-sdk');
const url = require('url');
const s3Config = require('../../config/s3');
const commonConstant = require('../../constants/commonConstant');

AWS.config.update({
    accessKeyId: s3Config[process.env.APP_ENV].key,
    secretAccessKey: s3Config[process.env.APP_ENV].secret,
});
const s3 = new AWS.S3();
const mainParams = {
    Bucket: s3Config[process.env.APP_ENV].bucket,
};

function list(startAfter = null) {
    const params = Object.assign({}, mainParams, {
        MaxKeys: commonConstant.limit,
        StartAfter: startAfter,
    });
    return new Promise((resolve, reject) => {
        s3.listObjectsV2(params, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}

function upload(path, body, readType) {
    const params = Object.assign({}, mainParams, {
        Body: body,
        Key: path,
        ACL: readType,
        ContentType: 'binary',
    });
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
    const objects = [];
    if (typeof path === 'string') {
        let { pathname } = url.parse(path);
        pathname = pathname.substr(1);
        objects.push({
            Key: pathname,
        });
    } else {
        path.forEach((element) => {
            let { pathname } = url.parse(element);
            pathname = pathname.substr(1);
            objects.push({
                Key: pathname,
            });
        });
    }
    const params = Object.assign({}, mainParams, {
        Delete: { Objects: objects },
    });
    return new Promise((resolve, reject) => {
        s3.deleteObjects(params, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}

module.exports = { list, upload, destroy };
