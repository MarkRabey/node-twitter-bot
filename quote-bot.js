var Twit = require('twit');

var T = new Twit({
	consumer_key: '1FFHjbK8PpZrdEXqSSUFhKd97'
	, consumer_secret: 'FUO6pkANQ06zGQf2ikN4Cx9DInpLjp5YBYciMhKfDWDfxlO0ss'
	, access_token: '2483001486-ePWICvcNIsCw1xsVRGTcYNcXeJRZQ19K1X3EgrN'
	, access_token_secret: 'm1hShCCzOvQKIzBvxx9Xoaa6g7o0n7YoeCLVqDUyDJixh'
});

function retweetRecent() {
	T.get('search/tweets', {q: "#coldfusion OR #cfml", result_type: "recent"}, function (err, data,response) {
		if (!err) {
			var tweet = data.statuses[0];
			var retweetBody = 'RT @' + tweet.user.screen_name + ' ' + tweet.text;
			T.post('statuses/update',{status:retweetBody}, function (err,response) {
				if (response) {
					console.log('Quote Tweeted Tweet ID: ' + tweet.id_str);
				}
				if (err) {
					console.log('Quote Tweet Error: ', err);
				}
			});
		} else {
			console.log('Search Error: ', err);
		}
	});
}

retweetRecent();
setInterval(retweetRecent, 1800000);