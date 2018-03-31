var express = require('express');
var router = express.Router();

/* GET users listing. */

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
  res.send(londonTempData);
});


module.exports = router;
