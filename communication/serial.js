var SerialPort = require("serialport");


// console.log("Program Started");

// var serialport = new SerialPort("/dev/ttyACM0");

var myPort = new SerialPort('/dev/ttyACM0', {
    parser: new SerialPort.parsers.Readline('\n')
},false);

// var myPort = new SerialPort('/dev/ttyUSB0', {
//     baudRate: 9600,
//     parser: new SerialPort.parsers.Readline('\r\n')


// });
var currentString="";
myPort.on('open', function(){
	// console.log('Serial Port Opened');
	myPort.on('data', function(data){
		// currentValue=data.toString('utf8');
		currentValue=data.toString();
		// console.log(currentString);
		if(currentValue.includes("\n")){
			currentString=currentString+currentValue;
			currentString=currentString.replace("\n",'');
			console.log(parseFloat(currentString))
			currentString="";
		}
		else{
			currentString=currentString+currentValue;
		}
	});
});
