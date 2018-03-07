var serialport = require('serialport');
var express = require('express');
var morgan = require('morgan');
var path = require('path');
var sqlite3 = require('sqlite3');
var app = express();
var async = require('async');
app.use(morgan('combined'));


var db= new sqlite3.Database('digitalTwin.db');

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

async function createTable() {


    let promise = new Promise((resolve, reject) => {
        console.log("Entered Create Table");
        db.run('CREATE TABLE IF NOT EXISTS tempurature(ID INTEGER PRIMARY KEY,tempurature TEXT)');
        return resolve("Done");
    });
  
    let result = await promise; // wait till the promise resolves (*)
    return result;
    
}

createTable().then((result)=>{
    console.log("First Then ");
})

createTable().then((result)=>{
    console.log("Entered first then");
    db.each("SELECT ID FROM tempurature ORDER BY ID DESC LIMIT 1", function(err, row) {  
		insertId=row.ID+1;
		console.log("From DB function User id  : "+row.ID);  
    });
    })
    .then((result)=>{
        var stmt = db.prepare("INSERT INTO tempurature VALUES (?,?)");
        console.log("User id : "+insertId);
        myPort.on('open', onOpen);
        myPort.on('data', function (data) {
            currentValue=data.toString('utf8');
            stmt.run(insertId,currentValue);
            insertId=insertId+1;
            console.log('Data:',currentValue);
            console.log('Insert ID: ' ,insertId);
        
        });
    });


