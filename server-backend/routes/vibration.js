var express = require('express');
var router = express.Router();

/* GET users listing. */

var vibrationData = {
    frequency: '50Hz',
    unit: 'Hz',
    dataPoints: []
};

router.get('/get', function(req, res, next) {
  res.send(vibrationData);
});


module.exports = router;
