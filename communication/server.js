var serialport = require('serialport');
var express = require('express');
var morgan = require('morgan');
var path = require('path');


var app = express();
app.use(morgan('combined'));

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'ui', 'index.html'));
// });



app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

function onOpen(){
    console.log('Open connections!');
}

var myPort = new serialport('/dev/ttyUSB0', {
    baudRate: 9600,
    parser: new serialport.parsers.Readline('\r\n')
});

var currentValue=0;

function onData(data){
    currentValue=data;
}

function createTemplate(currentValue){

	var currentNumber=currentValue;
	var htmlTemplate=
		`<!doctype html>
			<html>
			    <head>
			        <link href="/ui/style.css" rel="stylesheet" />
			    </head>
			    <body>
			        <div class="center">
			            <img src="/ui/madi.png" class="img-medium"/>
			        </div>
			        <br>
			        <div class="center text-big bold">
			            Sample Demo for Communication for Digital Twin using arduino and Nodejs ${currentNumber}
			        </div>

			        <script type="text/javascript" src="/ui/main.js">
			        </script>
			    </body>
			</html>
	`;

	return htmlTemplate;
}

app.get('/',function(req,res){
	res.send(createTemplate(currentValue));
});


myPort.on('open', onOpen);
myPort.on('data', onData);

var port = 8081; // Use 8080 for local development because you might already have apache running on 80
app.listen(8081, function () {
  console.log(`Digital Twin Listening on port ${port}!`);
});


// var http = require('http');

// http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end(currentValue);
// }).listen(8081);

console.log('Server running at http://127.0.0.1:8081');




