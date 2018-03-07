var serialport = require('serialport');
var express = require('express');
var morgan = require('morgan');
var path = require('path');
var sqlite3 = require('sqlite3');
var db= new sqlite3.Database('digitalTwin.db');
var app = express();
app.use(morgan('combined'));


//function to read from Arduino
var myPort = new serialport('/dev/ttyUSB0', {
    baudRate: 9600,
    parser: new serialport.parsers.Readline('\r\n')


});

// Function associated with serial port . Excecutes when connection is open
function onOpen(){
    console.log('Open connections!');
}

var currentValue="";
var insertId=0;
function initializeDB(){
	var db= new sqlite3.Database('test.db');
	db.run('CREATE TABLE IF NOT EXISTS tempurature(ID INTEGER PRIMARY KEY,tempurature TEXT)');
	var stmt = db.prepare("INSERT INTO tempurature VALUES (?,?)");
	db.each("SELECT ID FROM tempurature ORDER BY ID DESC LIMIT 1", function(err, row) {  
		insertId=row.ID;
		console.log("From DB function User id  : "+row.ID);  
	});
	
}

// db.each("SELECT ID,tempurature FROM tempurature", function(err, row) {  
// 	console.log("User id : "+row.ID);  
// });
var data= initializeDB();

// Because of the stupid asyncronous call this will get excecuted initially
console.log("User id : "+insertId);


setTimeout(function (){

	console.log("Last Try "+insertId);
  
  }, 5);







myPort.on('open', onOpen);
myPort.on('data', function (data) {
	currentValue=data.toString('utf8');
	stmt.run(insertId,currentValue);
	insertId=insertId+1;
 	console.log('Data:',currentValue);
 	if(insertId==1000)
 	{
 		db.close()
 		process.exit()
 	}
});



