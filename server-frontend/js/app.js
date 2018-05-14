var warningTemp =  40;
var shutDownTemp = 45;
var warningCurrent = 50;
var shutDownCurrent = 60;
var warningWear = 280;
var shutdownWear = 300;

var toolSelected=1;

var dataWear1 = {
  labels: [ "1", "2", "3", "4", "5","6","7","8","9","10","11"],
  datasets: [
      {
          label: "Tool Wear in Microns",
          fillColor : "rgba(151,187,205,0.5)",
          strokeColor : "rgba(151,187,205,1)",
          pointColor : "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data : [0,57.6,111.6,150,172,204]
      },
  ]
};

var dataWear2 = {
  labels: [ "1", "2", "3", "4", "5","6","7","8","9","10","11"],
  datasets: [
      {
          label: "Tool Wear in Microns",
          fillColor : "rgba(151,187,205,0.5)",
          strokeColor : "rgba(151,187,205,1)",
          pointColor : "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data : [0,57.6,100,132]
      },
  ]
};

var dataWear3 = {
  labels: [ "1", "2", "3", "4", "5","6","7","8","9","10","11"],
  datasets: [
      {
          label: "Tool Wear in Microns",
          fillColor : "rgba(151,187,205,0.5)",
          strokeColor : "rgba(151,187,205,1)",
          pointColor : "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data : [0,30,88,121]
      },
  ]
};

var dataWear4 = {
labels: [ "1", "2", "3", "4", "5","6","7","8","9","10","11"],
datasets: [
    {
        label: "Tool Wear in Microns",
        fillColor : "rgba(151,187,205,0.5)",
        strokeColor : "rgba(151,187,205,1)",
        pointColor : "rgba(151,187,205,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data : [0,70,120,180]
    },
]
};

var defaultWear= dataWear1;

var socket = io.connect('http://54.190.43.20:6001');
var vibsocket = io.connect('http://54.190.43.20:4000');

function MainViewModel(data) {
  var self = this;
  var serverIp = 'http://54.190.43.20';
  var localIp  = 'localhost';

  var fillTextWarning ="";
  var fillTextShutdown = "";
  Chart.types.Line.extend({
      name: "LineAlt",
      draw: function () {
          Chart.types.Line.prototype.draw.apply(this, arguments);
          
          var ctx = this.chart.ctx;
          ctx.save();
          // text alignment and color
          ctx.textAlign = "center";
          ctx.textBaseline = "bottom";
          ctx.fillStyle = this.options.scaleFontColor;
          // position
          var x = this.scale.xScalePaddingLeft * 0.4;
          var y = this.chart.height / 2;
          // change origin
          ctx.translate(x, y)
          // rotate text
          ctx.fillText("Time", 274, 202);
          ctx.fillText(fillTextWarning,400,-175);
          ctx.fillText(fillTextShutdown,400,-150);
          ctx.rotate(-90 * Math.PI / 180);""
          ctx.fillText(this.datasets[0].label, 0, 0);
          
          ctx.beginPath();
          ctx.restore();
      }
  });

  var dataTemp = {
      labels: [ "1", "2", "3", "4", "5","6","7","8","9","10","11"],
      datasets: [
          {
              label: "Tempurature (C)",
              fillColor : "rgba(151,187,205,0.5)",
              strokeColor : "rgba(151,187,205,1)",
              pointColor : "rgba(151,187,205,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(220,220,220,1)",
              data : [26,27,27.3,28.1,29.4,30.1,30.6,34.2,36.2,38.4,36,34]
          },
      ]
  };

  var dataCurrent = {
      labels: [ "1", "2", "3", "4", "5","6","7","8","9","10","11"],
      datasets: [
          {
              label: "Spindle Drive Current (A)",
              fillColor : "rgba(151,187,205,0.5)",
              strokeColor : "rgba(151,187,205,1)",
              pointColor : "rgba(151,187,205,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(220,220,220,1)",
              data : [27,88,13,97,44,13,79,28,12,67]
          },
      ]
  };
  
  socket.on('newTemp', function (data) {
    dataTemp.datasets[0].data.shift();
    dataTemp.datasets[0].data.push(data);
    if(tabSelected==0){
      self.initLineTemp();
    }
    if(data>warningTemp&&data<shutDownTemp){
      excecuteWarning("Tempurature Exceeded "+warningTemp);
    }
    if(data>=shutDownTemp){
      executeShutdown("Tempurature Exceeded "+shutDownTemp);
    }
  });

  socket.on('newCurrent', function (data) {
    dataCurrent.datasets[0].data.shift();
    dataCurrent.datasets[0].data.push(data.value);
    if(tabSelected==1){
      self.initLineCurrent();
    }
    if(data.value>warningCurrent && data.value<shutDownCurrent){
      excecuteWarning("Current Exceeded "+warningCurrent);
    }
    if(data.value>=shutDownCurrent){
      executeShutdown("Current Exceeded "+shutDownCurrent);
    }
  });

  vibsocket.on('vibrationData',function(data){
    var currentArrayLength= defaultWear.datasets[0].data.length;
    var previousWearValue=defaultWear.datasets[0].data[currentArrayLength-1];
    // var labelslength = self.wearValues().
    console.log(defaultWear.labels)
    console.log(data.var);
    var labelLength = defaultWear.labels.length;
    var currentWear=previousWearValue+4;
    if(data.var>0.008)
    {
      defaultWear.labels.push(labelLength+1);
      defaultWear.datasets[0].data.push(currentWear);
      switch(toolSelected){
        case 1: dataWear1 = defaultWear;
                break;
        case 2: dataWear2 = defaultWear;
                break;
        case 3: dataWear3 = defaultWear;
                break;
        case 4: dataWear4 = defaultWear;
                break;
      }
      console.log(self)
      console.log("Wear Value Appended");
    }

    self.initLineWear();

    if(currentWear>warningWear&&currentWear<shutdownWear){
      excecuteWarning("Wear Exceeded "+warningWear);
    }
    if(currentWear>=shutdownWear){
      executeShutdown("Wear Exceeded "+shutdownWear);
    }

  });
  
  self.initLineTemp = function() {
    fillTextWarning ="Warning Tempurature = "+warningTemp;
    fillTextShutdown = "ShutDown Tempurature = "+shutDownTemp;
    var ctx = document.getElementById("canvas").getContext("2d");
        var myLineChart = new Chart(ctx).LineAlt(dataTemp, {
            // make enough space on the right side of the graph
            scaleLabel: "          <%=value%>"
        });

  }

  self.initLineCurrent = function() {
    fillTextWarning ="Warning Current Consumptiom = "+warningCurrent;
    fillTextShutdown = "ShutDown Current Consumption = "+shutDownCurrent;
    var ctx = document.getElementById("canvas").getContext("2d");
        var myLineChart = new Chart(ctx).LineAlt(dataCurrent, {
            // make enough space on the right side of the graph
            scaleLabel: "          <%=value%>"
        });

  }

  self.initLineWear = function() {
    fillTextWarning ="Warning Wear = 280 Microns";
    fillTextShutdown = "ShutDown Wear = 300 Microns";
    var ctx = document.getElementById("canvasWear").getContext("2d");
        var myLineChart = new Chart(ctx).LineAlt(defaultWear, {
            // make enough space on the right side of the graph
            scaleLabel: "          <%=value%>"
        });

  }
}

var vm = new MainViewModel();

var endpointLocal="http://localhost:3330/state/get";
var endpointCloud="http://54.190.43.20:3330/state/get";


function inputForm() {
  
  var controlObject={"xValue":document.controlParams.xValue.value,
            "yValue":document.controlParams.yValue.value,
            "zValue":document.controlParams.zValue.value,
            "feedRate":document.controlParams.feedRate.value};
  console.log(controlObject);
  socket.emit('newControl', controlObject);
  ajax("http://54.190.43.20:3330/state/update","POST",controlObject,onUpdateComplete);
}

function onUpdateComplete(response){
  var respData = JSON.parse(response);
  var stateString="X Position = " + respData.xValue + " Y Position = "+respData.yValue+"    Z Position = "+respData.zValue;
  document.getElementById("currentState").innerHTML = stateString;
}
function videoForm(){
  var youtube = document.getElementById("videoSpace");
  youtube.style.display = "none";
}
function ajax(url, method, payload, successCallback){
  var xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onreadystatechange = function () {
  if (xhr.readyState != 4 || xhr.status != 200) return;
    successCallback(xhr.responseText);
  };
  xhr.send(JSON.stringify(payload));
}

function onFetchStateSuccess(response){
  var respData = JSON.parse(response);
  var stateString="X Position = " + respData.xValue + " Y Position = "+respData.yValue+"    Z Position = "+respData.zValue;
  console.log(stateString);
  document.getElementById("currentState").innerHTML = stateString;
}

console.log("This is getting printed");
ajax(endpointCloud, "GET",{}, onFetchStateSuccess);

function onExperimentStart(){
  socket.emit('collectData',1);
  console.log("Message send for starting Data Collection")
}

function tabSelectCurrent(){
  vm.initLineCurrent();
  tabSelected=1;
}

function tabSelectTemp(){
  vm.initLineTemp();
  tabSelected=0;
}

function onExperimentStop(){
  socket.emit('collectData',2);
  console.log("Message send for stoping Data collection");
}

function onspindleStart(){
  socket.emit('collectData',0);
  console.log("Message send for starting the spindle");
}

function onspindleStop(){
  socket.emit('collectData',3);
  console.log("Message send for stoping the spindle");
}

function videoForm(){
  var youtube = document.getElementById("videoSpace");
  document.getElementById("videoFrame").src = "https://www.youtube.com/watch?v=XR_ub5eL9n0";
  youtube.style.display = "block";
  console.log(document.getElementById("videoFrame").src);
}

function excecuteWarning(message){
  alert("Warning "+message);
}

function executeShutdown(message){
  alert("Shutting down the Spindle : "+message);
  onspindleStop();
}

function toolSelect(response){
  console.log(response);
  if(response=="1"){
    toolSelected=1;
    defaultWear=dataWear1;
    vm.initLineWear();
  }
  if(response=="2"){
    toolSelected=2;
    defaultWear=dataWear2;
    vm.initLineWear();
  }
  if(response=="3"){
    toolSelected=3;
    defaultWear=dataWear3;
    vm.initLineWear();
  }
  if(response=="4"){
    toolSelected=4;
    defaultWear=dataWear4;
    vm.initLineWear();
  }
}