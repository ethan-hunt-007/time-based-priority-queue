var Converter = require("csvtojson").Converter;
var csvConverter = new Converter({constructResult:false});
var fs = require('fs');

const MAX_ELEMENTS = 9999999;
var timeQueue = new (require('./time-queue'))(MAX_ELEMENTS);

function readCSV(fileName) {
	fs.createReadStream(fileName, {'objectMode' : true, 'highWaterMark' : 40}).pipe(csvConverter)
		.on('error', function(message) {
			console.log("Error in scheduling task : " + message);
		})
		.on('record_parsed', function(data) {
			var record = JSON.parse(JSON.stringify(data));
			console.log(record);
		})
		.on('end_parsed', function() {
			console.log("All tasks scheduled");
		})
}


readCSV(process.argv[2])