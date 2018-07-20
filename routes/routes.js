const router = require('express').Router();

router.get('/test', (req, res) => {
    // return res.render('admin/users/login');
    return res.render('client/home/index');

});


module.exports = router;
