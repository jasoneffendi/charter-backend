var oauth = require('../models/twitterAuth')

class Twitter {
    static getTrends(req,res) {
        oauth.get(
            'https://api.twitter.com/1.1/trends/place.json?id=23424977',
            '582131408-MdlJd3JcvSFQvCZYJC05w8RI6ukJvhSkl6w6h3tq', //test user token 
            'ilKfbT0Yweu7r9QtzLwYdb6d8g7tMJK1yjLMvihrurXa6', //test user secret             
            function (e, data){
              if (e) console.error(e); 
                var tweets = JSON.parse(data)[0]
                console.log(tweets.trends)
                console.log(JSON.parse(data)[0].as_of)
            });
    }
}

module.exports = Twitter