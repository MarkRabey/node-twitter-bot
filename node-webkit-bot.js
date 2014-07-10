var Twit = require('twit');

var T = new Twit({
  consumer_key: '...'
  , consumer_secret: '...'
  , access_token: '...'
  , access_token_secret: '...'
});

function retweetRecent() {
  var output = document.createElement('LI');
  
  
  T.get('search/tweets', {q: "#coldfusion OR #cfml", result_type: "recent"}, function (err, data,response) {
    if (!err) {
      var retweetId = data.statuses[0].id_str;
      T.post('statuses/retweet/' + retweetId, { }, function (err, response) {
        if (response) {
          var txt = document.createTextNode('Retweeted Tweet ID: ' + retweetId);
        }
        if (err) {
          var txt = document.createTextNode('Retweet Error: [' + retweetId + '] - ' + err.allErrors);
          console.log('Retweet Error: ', err);
        }
        output.appendChild(txt);
      });
    } else {
      var txt = document.createTextNode('Search Error: ' + err.message);
      output.appendChild(txt);
    }
    document.getElementById('console').appendChild(output);
  });
}

retweetRecent();
setInterval(retweetRecent, 1800000);