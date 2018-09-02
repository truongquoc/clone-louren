const Hashids = require('hashids');
const { hashidsChars, keys } = require('../config/hashids');

const hashids = new Hashids('', 10, hashidsChars);

const encode = id => (hashids.encodeHex(id));

const decode = id => (hashids.decodeHex(id));

const loopHashids = (data) => {
    if (data && data.length) {
        for (const key in data) {
            data[key] = loopHashids(data[key]);
        }
    } else {
        data = JSON.parse(JSON.stringify(data));
        Object.keys(data).forEach((key) => {
            if (data[key].length && typeof data[key] === 'object') {
                data[key] = loopHashids(data[key]);
            } else {
                if (keys.indexOf(key) >= 0) {
                    data[key] = hashids.encodeHex(data[key]);
                }
            }
        });
    }

    return data;
};

const loopParseHashids = (data) => {
    if (data && data.length && typeof data === 'object') {
        for (const key in data) {
            if (typeof data[key] === 'string') {
                data[key] = hashids.decodeHex(data[key]);
                continue;
            }
            data[key] = loopParseHashids(data[key]);
        }
    } else {
        data = JSON.parse(JSON.stringify(data));
        Object.keys(data).forEach((key) => {
            if (data[key].length && typeof data[key] === 'object') {
                data[key] = loopParseHashids(data[key]);
            } else {
                if (keys.indexOf(key) >= 0) {
                    data[key] = hashids.decodeHex(data[key]);
                    if (typeof data[key] === 'object') {
                        throw new Error('INVALID_HASHIDS');
                    }
                }
            }
        });
    }

    return data;
};

module.exports = {
    encode,
    decode,
    loopHashids,
    loopParseHashids,
};
