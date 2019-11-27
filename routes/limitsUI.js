var express = require('express');
var router = express.Router();

/* GET Limit-UI page. */
router.get('/', function(req, res, next) {
    res.render('limitsUI');
  });
  
  module.exports = router;