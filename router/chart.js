const express = require('express');
const router = express.Router();
const chartController = require('../controllers/chartController')
const twitterController = require('../controllers/twitterController')

router.get('/', chartController.getList)

router.get('/trends/search/:fileName', chartController.readData)

router.get('/trends/:WOEID', twitterController.getTrends)

router.get('/tweets/:query', twitterController.searchTweets)


module.exports = router