function MainViewModel(data) {
  var self = this;
  var serverIp = 'http://34.212.83.92';
  var localIp  = 'localhost';
  var socket = io.connect('http://34.212.83.92:6001');
  var vibsocket = io.connect('http://34.212.83.92:4000');
  // var socket = io.connect(localhost+':8070');
  // var socket = io.connect('http://127.0.0.1:3000');
  
  // self.displayTempStatictics = function(){
  //   var average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
  //   var averageValue=average(self.lineChartDataTemp().datasets[0].data);
  //   document.getElementById("tempAvg").innerHTML = "Average Tempurature = "+ averageValue;
  // };

  // self.displayCurrentStatictics = function(){
  //   var average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
  //   var averageValue=average(self.lineChartDataCurrent().datasets[0].data);
  //   document.getElementById("currentAvg").innerHTML = "Average Tempurature = "+ averageValue;
  // };
  
  self.lineChartDataTemp = ko.observable({
    labels : ["1","2","3","4","5","6","7","8","9","10","11"],
    datasets : [
      {
        label: "Spindle Drive Current (A)", 
        fillColor : "rgba(151,187,205,0.5)",
        strokeColor : "rgba(151,187,205,1)",
        pointColor : "rgba(151,187,205,1)",
        pointStrokeColor : "#fff",
        data : [26,27,27.3,28.1,29.4,30.1,30.6,34.2,36.2,38.4,36,34]
      }
    ]
  });

  // self.lineChartDataTemp = ko.observable({
  //   labels : ["0","1","2","3","4","5","6","7","8","9","10","11"],
  //   datasets : [
  //     {
  //       fillColor : "rgba(151,187,205,0.5)",
  //       strokeColor : "rgba(151,187,205,1)",
  //       pointColor : "rgba(151,187,205,1)",
  //       pointStrokeColor : "#fff",
  //       data : [26,27,27.3,28.1,29.4,30.1,30.6,34.2,36.2,38.4,36,34]
  //     }
  //   ]
  // });

  self.lineChartDataCurrent = ko.observable({
    labels : ["0","1","2","3","4","5","6","7","8","9"],
    datasets : [
      {
        fillColor : "rgba(151,187,205,0.5)",
        strokeColor : "rgba(151,187,205,1)",
        pointColor : "rgba(151,187,205,1)",
        pointStrokeColor : "#fff",
        data : [27,88,13,97,44,13,79,28,12,67]
      }
    ]
  });

  self.wearValues = ko.observable({
    labels : ["0","1","2","3","4","5","6","7","8","9"],
    datasets : [
      {
        fillColor : "rgba(151,187,205,0.5)",
        strokeColor : "rgba(151,187,205,1)",
        pointColor : "rgba(151,187,205,1)",
        pointStrokeColor : "#fff",
        data : [57.6,111.6,150,172,204]
      }
    ]
  });
  
  socket.on('newTemp', function (data) {
    self.lineChartDataTemp().datasets[0].data.shift();
    self.lineChartDataTemp().datasets[0].data.push(data);
    if(tabSelected==0){
      self.initLineTemp();
    }
  });

  socket.on('newCurrent', function (data) {
    self.lineChartDataCurrent().datasets[0].data.shift();
    self.lineChartDataCurrent().datasets[0].data.push(data);
    if(tabSelected==1){
      self.initLineCurrent();
    }
  });

  vibsocket.on('vibrationData',function(data){
    var currentArrayLength= self.wearValues().datasets[0].data.length;
    var previousWearValue=self.wearValues().datasets[0].data[currentArrayLength-1];
    // var labelslength = self.wearValues().
    console.log(self.wearValues().labels)
    console.log(data.var);
    if(data.var>0.008)
    {
      self.wearValues().datasets[0].data.push(previousWearValue+4);
      console.log(self)
      console.log("Wear Value Appended");
    }

    self.initLineWear();

  });
  
  self.initLineTemp = function() {
    var options = {
      animation : false,
      scaleOverride : false,
      scaleSteps : 10,//Number - The number of steps in a hard coded scale
      scaleStepWidth : 10,//Number - The value jump in the hard coded scale       
      // // scaleStartValue : 10//Number - The scale starting value
    };

    var ctxTemp = $("#canvas").get(0).getContext("2d");
    var myLineTemp = new Chart(ctxTemp).Line( vm.lineChartDataTemp(), options );

  }

  self.initLineCurrent = function(){
    var options = {
      animation : false,
      scaleOverride: false,
      scaleSteps : 10,
      scaleStepWidth: 10
    }

    var ctxCurrent = $('#canvas').get(0).getContext("2d");
    var myLineCurrent= new Chart(ctxCurrent).Line(vm.lineChartDataCurrent(),options);

    

  }

  self.initLineWear = function(){
    var options = {
      animation : false,
      scaleOverride: false,
      // scaleSteps : 10,
      // scaleStepWidth: 10
    }

    var ctxWear = $('#canvasWear').get(0).getContext("2d");
    var myLineWear = new Chart(ctxWear).Line(vm.wearValues(),options);

  
  }
  
}

var vm = new MainViewModel();

var socket = io.connect('http://34.212.83.92:6001');



// var socket = io.connect('http://localhost:6001')
var endpointLocal="http://localhost:3330/state/get";
var endpointCloud="http://34.212.83.92:3330/state/get";

// function login(){
//   console.log(document.userName);

// }

function inputForm() {
  
  var controlObject={"xValue":document.controlParams.xValue.value,
            "yValue":document.controlParams.yValue.value,
            "zValue":document.controlParams.zValue.value,
            "feedRate":document.controlParams.feedRate.value};
  // var socket = io.connect('http://34.212.83.92:6001');
  console.log(controlObject);
  socket.emit('newControl', controlObject);
  ajax("http://34.212.83.92:3330/state/update","POST",controlObject,onUpdateComplete);
  // socket.on ('reloadFlag', function (data) {
  //   ajax(endpointCloud, "GET",{}, onFetchStateSuccess)
  //  });
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




// (function() {

//     var serverUrl = "/",
//         members = [],
//         channel,tempuratureChartRef;

//     function showEle(elementId){
//       document.getElementById(elementId).style.display = 'flex';
//     }

//     function hideEle(elementId){
//       document.getElementById(elementId).style.display = '   ne';
//     }

//     function ajax(url, method, payload, successCallback){
//       var xhr = new XMLHttpRequest();
//       xhr.open(method, url, true);
//       xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//       xhr.onreadystatechange = function () {
//         if (xhr.readyState != 4 || xhr.status != 200) return;
//         successCallback(xhr.responseText);
//       };
//       xhr.send(JSON.stringify(payload));
//     }


//   // Specifi Code For Rendering the tempurature Data

//   //   var option = {
//   //   showLines: true
//   // };

//   // var ctx = document.getElementById("tempuratureChart").getContext("2d");

//   // tempuratureChartRef = new Chart(ctx, {
//   //   type: "line",
//   //   data: tempuratureData,
//   //   options: options
//   // });
//   // var myLineChart = Chart.Line(canvas,{
//   //   data:tempuratureData,
//   //   options:option
//   // });

//   // var previousLength=0;
//   // function renderTempChart(tempuratureData){
//   //   var currentLength=tempuratureData.labels.length;

//   // }


//    function renderTempChart(tempuratureData) {
//       var ctx = document.getElementById("tempuratureChart").getContext("2d");
//       var options={};
//       tempuratureChartRef = new Chart(ctx, {
//         type: "line",
//         data: tempuratureData,
//         options: options
//       });

//       console.log(tempuratureData.labels.length);
//   }

//   var chartConfig = {
//     labels: [],
//     datasets: [
//       {
//           label: "Tempurature Readings",
//           fill: false,
//           lineTension: 0.1,
//           backgroundColor: "rgba(75,192,192,0.4)",
//           borderColor: "rgba(75,192,192,1)",
//           borderCapStyle: 'butt',
//           borderDash: [],
//           borderDashOffset: 0.0,
//           borderJoinStyle: 'miter',
//           pointBorderColor: "rgba(75,192,192,1)",
//           pointBackgroundColor: "#fff",
//           pointBorderWidth: 1,
//           pointHoverRadius: 5,
//           pointHoverBackgroundColor: "rgba(75,192,192,1)",
//           pointHoverBorderColor: "rgba(220,220,220,1)",
//           pointHoverBorderWidth: 2,
//           pointRadius: 1,
//           pointHitRadius: 10,
//           data: [],
//           spanGaps: false,
//       }
//     ]
//   };


  
//   ajax("http://localhost:3000/tempurature/get", "GET",{}, onFetchTempSuccess);


//   // function continouslyUpdate(){
//   //   ajax("http://localhost:3000/tempurature/get", "GET",{}, onFetchTempSuccess);
//   //   setTimeout(continouslyUpdate,5000);

//   // };

//   // continouslyUpdate();
  

//   function onFetchTempSuccess(response){
//     hideEle("loader");
//     var respData = JSON.parse(response);
//     chartConfig.labels = respData.dataPoints.map(dataPoint => dataPoint.id);
//     chartConfig.datasets[0].data = respData.dataPoints.map(dataPoint => dataPoint.temperature);
//     renderTempChart(chartConfig)
//   }




// })();
