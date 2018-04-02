var express = require('express');
var router = express.Router();

/* GET users listing. */

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var temperatureData = {
    frequency: '50Hz',
    unit: 'celsius',
    dataPoints: [
      {
        id: 0,
        temperature: 12 
      },
      {
        id: 1,
        temperature: 13 
      },
      {
        id: 2,
        temperature: 15 
      },
      {
        id: 3,
        temperature: 14 
      },
      {
        id: 4,
        temperature: 15 
      },
      {
        id: 5,
        temperature: 12 
      },
    ]
  }

router.get('/get', function(req, res, next) {
  res.send(temperatureData);
});

router.get('/add',function(req,res,next){
  var temp=parseInt(req.query.temperature);
  if(temp && !isNaN(temp)){
    var newDataPoint = {
      id: Object.keys(temperatureData.dataPoints).length +1,
      temperature:temp
    };

    console.log(newDataPoint)
    temperatureData.dataPoints.push(newDataPoint);
    res.send({sucess:true, newDataPoint});
  }
  else{
    res.send({sucess:false,errorMessage:"Invalid Query Parameters"});
  }
});


module.exports = router;
