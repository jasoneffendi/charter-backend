const express = require('express');
const router = express.Router();
const chartController = require('../controllers/chartController')
const twitterController = require('../controllers/twitterController')

router.get('/', chartController.getData)

router.get('/trends/:WOEID', twitterController.getTrends)

module.exports = router