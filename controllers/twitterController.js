var oauth = require('../models/twitterAuth')
var Excel = require('exceljs');
var workbook = new Excel.Workbook();

var newSheet = workbook.addWorksheet('Twitter Trends');
var worksheet = workbook.getWorksheet('Twitter Trends')
class Twitter {
    static getTrends(req,res) {
        console.log(req.params.WOEID)
        var WOEID = req.params.WOEID || 23424977;
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var d = new Date();
        var day = days[d.getDay()];
        var hr = d.getHours();
        var min = d.getMinutes();
        if (min < 10) {
            min = "0" + min;
        }
        var ampm = "am";
        if( hr > 12 ) {
            hr -= 12;
            ampm = "pm";
        }
        var date = d.getDate();
        var month = months[d.getMonth()];
        var year = d.getFullYear();
        var formattedDate = day + " " + hr + "." + min + ampm + " " + date + " " + month + " " + year;
        console.log(formattedDate)
        oauth.get(
            `https://api.twitter.com/1.1/trends/place.json?id=${WOEID}`,
            '582131408-MdlJd3JcvSFQvCZYJC05w8RI6ukJvhSkl6w6h3tq', //test user token 
            'ilKfbT0Yweu7r9QtzLwYdb6d8g7tMJK1yjLMvihrurXa6', //test user secret             
            function (e, data){
              if (e) console.error(e); 
                var tweets = JSON.parse(data)[0]
                worksheet.addRow(['Trend', 'Query', 'Tweet Volume', 'Date']);
                tweets.trends.forEach(trend => {
                    worksheet.addRow([trend.name, trend.query, trend.tweet_volume, tweets.as_of]);
                })
                workbook.xlsx.writeFile(`./mined_data/spreadsheet/Twitter Trends(${tweets.locations[0].name})(${formattedDate}).xlsx`).then(function() {
                    console.log("xls file is written.");
                    res.send('xls file is written')            
                });
            });
    }
}

module.exports = Twitter