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
      console.log(data);
    });
    
    self.initLineTemp = function() {
      var options = {
        animation : false,
        scaleOverride : true,
        scaleSteps : 10,//Number - The number of steps in a hard coded scale
        scaleStepWidth : 10,//Number - The value jump in the hard coded scale       
        // scaleStartValue : 10//Number - The scale starting value
      };
  
      var ctxTemp = $("#canvas").get(0).getContext("2d");
      var myLineTemp = new Chart(ctxTemp).Line( vm.lineChartDataTemp(), options );
  
    }
  
    self.initLineCurrent = function(){
      var options = {
        animation : false,
        scaleOverride: true,
        scaleSteps : 10,
        scaleStepWidth: 10
      }
  
      var ctxCurrent = $('#canvas').get(0).getContext("2d");
      var myLineCurrent= new Chart(ctxCurrent).Line(vm.lineChartDataCurrent(),options);
  
    }
    
  }
  
  var vm = new MainViewModel();
  
  var socket = io.connect('http://34.212.83.92:6001');
  