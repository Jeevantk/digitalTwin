var express = require('express');
var router = express.Router();

/* GET users listing. */

var forceData = {
    frequency: '50Hz',
    unit: 'KN',
    dataPoints: []
};

router.get('/get', function(req, res, next) {
  res.send(forceData);
});


module.exports = router;
