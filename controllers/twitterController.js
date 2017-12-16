var oauth = require('../models/twitterAuth')
var Excel = require('exceljs');
var fs = require('fs');
var formattedDate = require('../helpers/formattedDate')()
var workbook = new Excel.Workbook();

var newSheet = workbook.addWorksheet('Twitter Trends');
var worksheet = workbook.getWorksheet('Twitter Trends');
class Twitter {
    static getTrends(req,res) {
        console.log(req.params.WOEID)
        var WOEID = req.params.WOEID || 23424977;
        oauth.get(
            `https://api.twitter.com/1.1/trends/place.json?id=${WOEID}`,
            '582131408-MdlJd3JcvSFQvCZYJC05w8RI6ukJvhSkl6w6h3tq', //test user token 
            'ilKfbT0Yweu7r9QtzLwYdb6d8g7tMJK1yjLMvihrurXa6', //test user secret             
            function (e, data){
              if (e) console.error(e); 
                var tweets = JSON.parse(data)[0]
                worksheet.addRow(['Trend', 'Query', 'Tweet Volume', 'Date']);
                var dict = [];
                tweets.trends.forEach(trend => {
                    worksheet.addRow([trend.name, trend.query, trend.tweet_volume, tweets.as_of]);
                    var obj = {'Trend' : trend.name,
                    'Query' : trend.query,
                    'Tweet Volume' : trend.tweet_volume,
                    'Date' : tweets.as_of
                    }
                    dict.push(obj)
                })
                workbook.xlsx.writeFile(`./mined_data/spreadsheet/Twitter Trends(${tweets.locations[0].name})(${formattedDate}).xlsx`)
                .then(function() {
                    console.log(`Twitter Trends(${tweets.locations[0].name})(${formattedDate})` + 'has been saved')
                    var dictstring = JSON.stringify(dict);                
                    fs.writeFile(`./mined_data/json/Twitter Trends(${tweets.locations[0].name})(${formattedDate})` + ".json", dictstring, (err) => {
                        if(err) throw err
                        res.send(`Twitter Trends(${tweets.locations[0].name})(${formattedDate})` + 'has been saved')
                    });                    
                });
            });
    }

    static searchTweets(req,res) {
        oauth.get(
            `https://api.twitter.com/1.1/search/tweets.json?q=%23saturdaymorning&result_type=mixed&count=100`,
            '582131408-MdlJd3JcvSFQvCZYJC05w8RI6ukJvhSkl6w6h3tq', //test user token 
            'ilKfbT0Yweu7r9QtzLwYdb6d8g7tMJK1yjLMvihrurXa6', //test user secret             
            function (e, data){
              if (e) console.error(e); 
                var tweets = JSON.parse(data)
                var dict = [];
                tweets.statuses.forEach(status => {
                    // worksheet.addRow([status.name, status.query, status.tweet_volume, tweets.as_of]);
                    var obj = {
                    'Text' : status.text,
                    'Tweeter' : status.user.screen_name,
                    'Tweeter description' : status.user.description,
                    'Date' : status.created_at
                    }
                    dict.push(obj)
                })
                console.log(dict)
                res.send({
                    data: dict,
                    status: 200
                })
            });
    }
}

module.exports = Twitter