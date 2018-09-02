const hashidsHelper = require('../../helpers/hashidsHelper');
const responseHelper = require('../../helpers/responseHelper');

const parseBodyHashids = (req, res, next) => {
    try {
        req.body = hashidsHelper.loopParseHashids(req.body);
        next();
    } catch (e) {
        return res.json(responseHelper.error(e.message, 400));
    }
};

const parseParamsHashids = (req, res, next) => {
    try {
        req.params = hashidsHelper.loopParseHashids(req.params);
        next();
    } catch (e) {
        return res.json(responseHelper.error(e.message, 400));
    }
};

module.exports = {
    parseBodyHashids,
    parseParamsHashids,
};
