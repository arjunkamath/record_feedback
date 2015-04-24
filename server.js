// Muaz Khan     - www.MuazKhan.com
// MIT License   - www.WebRTC-Experiment.com/licence
// Source Code   - github.com/muaz-khan/WebRTC-Experiment/tree/master/RecordRTC/RecordRTC-to-Nodejs

var config = require('./config'),
    http = require('http'),
    url = require('url'),
	pg = require('pg');
	
var display_request = require('request');
	
/* pg.connect(process.env.DATABASE_URL, function(err, client) {
  var query = client.query('SELECT * FROM your_table');

  query.on('row', function(row) {
    console.log(JSON.stringify(row));
  });
}); */

function start(route, handle) {

    function onRequest(request, response) {

        var pathname = url.parse(request.url).pathname,
            postData = '';

        request.setEncoding('utf8');

        request.addListener('data', function(postDataChunk) {
            postData += postDataChunk;
        });

        request.addListener('end', function() {
            route(handle, pathname, response, postData);
			
			console.log(postData);
			
			if(postData.indexOf("positive") > -1){
					display_request.get('https://agile-beach-2376.herokuapp.com/fire-event/positive');
			} else if(postData.indexOf("neutral") > -1){
					display_request.get('https://agile-beach-2376.herokuapp.com/fire-event/neutral');
			} else if(postData.indexOf("negative") > -1){
					display_request.get('https://agile-beach-2376.herokuapp.com/fire-event/negative');
			}
			
        });
    }
    http.createServer(onRequest).listen(config.port);
}

exports.start = start;
