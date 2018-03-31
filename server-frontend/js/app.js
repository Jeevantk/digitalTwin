(function() {

    var serverUrl = "/",
        members = [],
        channel,tempuratureChartRef;

    function showEle(elementId){
      document.getElementById(elementId).style.display = 'flex';
    }

    function hideEle(elementId){
      document.getElementById(elementId).style.display = 'none';
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


  // Specifi Code For Rendering the tempurature Data

   function renderTempChart(tempuratureData) {
      var ctx = document.getElementById("tempuratureChart").getContext("2d");
      var options = { };
      tempuratureChartRef = new Chart(ctx, {
        type: "line",
        data: tempuratureData,
        options: options
      });
  }

        var chartConfig = {
        labels: [],
        datasets: [
            {
                label: "Tempurature Readings",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [],
                spanGaps: false,
            }
        ]
    };

  ajax("http://34.212.83.92:3000/tempurature/get", "GET",{}, onFetchTempSuccess);

  function onFetchTempSuccess(response){
    hideEle("loader");
    var respData = JSON.parse(response);
    chartConfig.labels = respData.dataPoints.map(dataPoint => dataPoint.id);
    chartConfig.datasets[0].data = respData.dataPoints.map(dataPoint => dataPoint.temperature);
    renderTempChart(chartConfig)
  }




})();
