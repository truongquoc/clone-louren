const handleException = (err, req, res, next) => {
    if (!err.error) {
        throw err;
    }
    switch (err.error.code) {
        case 500: return res.json(`500: ${err.error.message}`);
        case 403: return res.sendStatus(403);
        default: return res.sendStatus(404);
    }
};

module.exports = { handleException };
