const url = require('url');
const fs = require('fs');

function upload(path, body) {
    const buffers = [];
    let buffer;
    return new Promise((resolve, reject) => {
        body.on('data', (data) => {
            buffers.push(data);
        });
        body.on('end', () => {
            buffer = Buffer.concat(buffers);
                fs.writeFile(`${process.cwd()}/public/images/${path}`, buffer, 'binary', (err) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(`/public/images/${path}`);
                });
            });
    });
}

function destroy(path) {
    const images = [];
    if (typeof path === 'string') {
        let { pathname } = url.parse(path);
        pathname = pathname.substr(1);
        images.push(pathname);
    } else {
        path.forEach((element) => {
            let { pathname } = url.parse(element);
            pathname = pathname.substr(1);
            images.push(pathname);
        });
    }
    const commands = images.map((image) => {
        return new Promise((resolve, reject) => {
            fs.unlink(image, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
    });

    return commands;
}

module.exports = {
    upload,
    destroy,
};
