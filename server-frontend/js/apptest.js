var chart = new Chart("chartContainer", {
    title:{
        text:"Chart 1"
    },  
    data: [
    {
      type: "column",
      dataPoints: [
      { x: 10, y: 71 },
      { x: 20, y: 55},
      { x: 30, y: 50 },
      { x: 40, y: 65 },
      { x: 50, y: 95 },
      { x: 60, y: 68 },
      { x: 70, y: 28 },
      { x: 80, y: 34 },
      { x: 90, y: 14}
      ]
    }
    ]
  });
chart.render();

function chartTab2() {
  var chart1 = new Chart("chartContainer1", {
    title:{
        text:"Chart 2"
    },
    data: [
    {
      type: "column",
      dataPoints: [
      { x: 10, y: 58 },
      { x: 20, y: 35},
      { x: 30, y: 36 },
      { x: 40, y: 75 },
      { x: 50, y: 45 },
      { x: 60, y: 28 },
      { x: 70, y: 48 },
      { x: 80, y: 14 },
      { x: 90, y: 54}
      ]
    }
    ]
  });
  chart1.render();
}

$('#bs-tab2').on("shown.bs.tab",function(){
    chartTab2();
    $('#bs-tab2').off(); // to remove the binded event after the initial rendering
});

console.log("Test");