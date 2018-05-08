function MainViewModel(data) {
  var self = this;
  var serverIp = 'http://34.212.83.92';
  var localIp  = 'localhost';
  var socket = io.connect('http://34.212.83.92:6001');
  // var socket = io.connect(localhost+':8070');
  // var socket = io.connect('http://127.0.0.1:3000');
  
  self.displayTempStatictics = function(){
    var average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
    var averageValue=average(self.lineChartDataTemp().datasets[0].data);
    document.getElementById("tempAvg").innerHTML = "Average Tempurature = "+ averageValue;
  };

  self.displayCurrentStatictics = function(){
    var average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
    var averageValue=average(self.lineChartDataCurrent().datasets[0].data);
    document.getElementById("currentAvg").innerHTML = "Average Tempurature = "+ averageValue;
  };
  
  self.lineChartDataTemp = ko.observable({
    labels : ["0","1","2","3","4","5","6","7","8","9"],
    datasets : [
      {
        fillColor : "rgba(151,187,205,0.5)",
        strokeColor : "rgba(151,187,205,1)",
        pointColor : "rgba(151,187,205,1)",
        pointStrokeColor : "#fff",
        data : [65,59,90,81,56,55,40,28,76,40]
      }
    ]
  });

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
  
  socket.on('newTemp', function (data) {
    self.lineChartDataTemp().datasets[0].data.shift();
    self.lineChartDataTemp().datasets[0].data.push(data);
    
    self.initLine();
    self.displayTempStatictics();
    //console.log(self.lineChartDataTemp().datasets[0].data);
  });

  socket.on('newCurrent', function (data) {
    self.lineChartDataCurrent().datasets[0].data.shift();
    self.lineChartDataCurrent().datasets[0].data.push(data);
    
    self.initLine();
    self.displayCurrentStatictics();
  });
  
  self.initLine = function() {
    var options = {
      animation : false,
      scaleOverride : true,
      scaleSteps : 10,//Number - The number of steps in a hard coded scale
      scaleStepWidth : 10,//Number - The value jump in the hard coded scale       
      scaleStartValue : 10//Number - The scale starting value
    };
    


    var ctxTemp = $("#canvasTemp").get(0).getContext("2d");
    var myLineTemp = new Chart(ctxTemp).Line( vm.lineChartDataTemp(), options );

    // var ctxCurrent = $("#canvasCurrent").get(0).getContext("2d");
    // var myLineCurrent = new Chart(ctxCurrent).Line( vm.lineChartDataCurrent(), options );


  }
  
}



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

function onExperimentStop(){
  socket.emit('collectData',0);
  console.log("Message send for stoping Data collection");
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
