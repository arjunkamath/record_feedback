// Muaz Khan     - www.MuazKhan.com
// MIT License   - www.WebRTC-Experiment.com/licence
// Source Code   - github.com/muaz-khan/WebRTC-Experiment/tree/master/RecordRTC/RecordRTC-to-Nodejs

var config = require('./config'),
    http = require('http'),
    url = require('url');
	
var request = require('request');
	
/* pg.connect(process.env.DATABASE_URL, function(err, client) {
  var query = client.query('SELECT * FROM your_table');

  query.on('row', function(row) {
    console.log(JSON.stringify(row));
  });
}); */

function start(route, handle) {

    function onRequest(req, res) {

        var pathname = url.parse(req.url).pathname,
            postData = '';

        req.setEncoding('utf8');

        req.addListener('data', function(postDataChunk) {
            postData += postDataChunk;
        });

        req.addListener('end', function() {
            route(handle, pathname, res, postData);
			
			console.log(postData);
			
			if(postData.indexOf("positive") > -1){
					request.get('https://agile-beach-2376.herokuapp.com/fire-event/positive');
			} else if(postData.indexOf("neutral") > -1){
					request.get('https://agile-beach-2376.herokuapp.com/fire-event/neutral');
			} else if(postData.indexOf("negative") > -1){
					request.get('https://agile-beach-2376.herokuapp.com/fire-event/negative');
			}
			
        });
    }
    http.createServer(onRequest).listen(config.port);
}

exports.start = start;
