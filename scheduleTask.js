var Converter = require("csvtojson").Converter;
var csvConverter = new Converter({constructResult:false});
var fs = require('fs');

const MAX_ELEMENTS = 999999;
var timeQueue = new (require('./time-queue'))(MAX_ELEMENTS);

function addEvent(event) {
	timeQueue.enqueue(event);
}

function scheduleEvent(event) {
	setTimeout(function() {
		console.log(`Current time [ ${event['time_to_expire']}  ] , Event "${event['event_name']}" Processed`)
	}, (event['ttl'] - relativeTime));
}

function readCSV(fileName) {
	fs.createReadStream(fileName, {'objectMode' : true, 'highWaterMark' : 40}).pipe(csvConverter)
		.on('error', function(message) {
			console.log("Error in scheduling task : " + message);
		})
		.on('record_parsed', function(data) {
			var record = JSON.parse(JSON.stringify(data));
			record['ttl'] = new Date(record['time_to_expire']).getTime();
			if(!record['priority']) {
				record['priority'] = 0;
			}
			addEvent(record);
		})
		.on('end_parsed', function() {
			console.log("All events added... Scheduling events");
			while((event = timeQueue.deque()) != null) {
				if(event['ttl'] - relativeTime >= 0) {
					scheduleEvent(event);
				} else {
					console.log(`Cannot schedule event "${event['event_name']}"`);
				}
			}
			console.log("All events scheduled");
		})
}

var relativeTime = new Date(process.argv[3]).getTime();
readCSV(process.argv[2]);