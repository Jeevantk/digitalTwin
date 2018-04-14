var SerialPort = require("serialport");


var myPort = new serialport('/dev/ttyACM0', {
    baudRate: 9600,
    parser: new serialport.parsers.Readline('\r\n')
});

var serialPort = new SerialPort("/dev/ttyACM0", {
  baudRate: 9600
});

serialPort.on('open', showPortOpen);
serialPort.on('data', saveLatestData);
serialPort.on('close', showPortClose);
serialPort.on('error', showError);

function showPortOpen() {
   console.log('port open. Data rate: ' + serialPort.options.baudRate);
}
 
function showPortClose() {
   console.log('port closed.');
}
 
function showError(error) {
   console.log('Serial port error: ' + error);
}

function saveLatestData(data) {
   console.log(data);
   latestData = data;
}