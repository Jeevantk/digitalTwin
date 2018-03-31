var express = require('express');
var router = express.Router();

/* GET users listing. */

var currentData = {
    frequency: '50Hz',
    unit: 'Amphere',
    dataPoints: [
      {
        id: 0,
        current: 12 
      },
      {
        id: 1,
        current: 30 
      },
      {
        id: 2,
        current: -4 
      },
      {
        id: 3,
        current: 20 
      },
      {
        id: 4,
        current: 7 
      },
      {
        id: 5,
        current: 6 
      },
      {
        id: 5,
        current: 60 
      },
    ]
  }

router.get('/get', function(req, res, next) {
  res.send(currentData);
});


module.exports = router;
