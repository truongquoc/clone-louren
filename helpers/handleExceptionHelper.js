const handleException = (err, req, res, next) => {
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
        case 403:
            if (url[1] === 'admin') {
                return res.render('errors/admin/403');
            }
            return res.render('errors/client/403');
        default:
            if (url[1] === 'admin') {
                return res.render('errors/admin/404');
            }
            return res.render('errors/client/404');
    }
};

module.exports = { handleException };
