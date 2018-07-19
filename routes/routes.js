const router = require('express').Router();

router.get('/test', (req, res) => {
    return res.render('admin/users/login');
});

module.exports = router;
