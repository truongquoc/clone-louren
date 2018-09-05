const handleException = (err, req, res) => {
    if (!err.error) {
        throw err;
    }
    const url = req.originalUrl.split('/');
    switch (err.error.code) {
        case 500:
            if (url[1] === 'admin') {
                return res.render('errors/admin/500');
            }
            return res.render('errors/client/500');
        case 403: return res.sendStatus(403);
        default: return res.sendStatus(404);
    }
};

module.exports = { handleException };
