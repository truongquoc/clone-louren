const express = require('express');
const fs = require('fs');
const roleHelper = require('../../helpers/roleHelper');
const responseHelper = require('../../helpers/responseHelper');

const router = express.Router();

router.get('/', (req, res, next) => {
    if (!roleHelper.hasRole(req.session.cUser, 'Admin')) {
        return next(responseHelper.notAuthorized());
    }
    fs.readFile(`${process.cwd()}/robots.txt`, 'utf8', (err, content) => {
        if (err) return next(err);
        res.render('modules/robots/admin/create', { content });
    });
});

router.post('/', (req, res, next) => {
    if (!roleHelper.hasRole(req.session.cUser, 'Admin')) {
        return next(responseHelper.notAuthorized());
    }
    fs.writeFile(`${process.cwd()}/robots.txt`, req.body.robots, 'utf8', (err) => {
        if (err) return next(err);
        req.flash('success', 'Cập nhật file Robots.txt thành công!');
        res.redirect('/admin/robots');
    });
});

module.exports = router;
