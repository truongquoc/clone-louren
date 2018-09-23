const express = require('express');
const linkController = require('./controllers/linkController.admin');
const linkRequest = require('./requests/linkRequest');

const router = express.Router();

router.route('/')
        .get(linkController.index);

router.route('/create')
        .get(linkController.create)
        .post(linkRequest.create, linkController.store);

router.route('/edit/:id')
        .get(linkController.edit)
        .post(linkRequest.create, linkController.update);

router.delete('/delete', linkController.delete);

router.post('/update', linkController.updateStt);

module.exports = router;
