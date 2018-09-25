const express = require('express');
const linkController = require('./controllers/linkController.admin');

const router = express.Router();

router.route('/')
        .get(linkController.index);

router.post('/update', linkController.updateStt);

module.exports = router;
