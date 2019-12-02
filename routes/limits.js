var express = require('express');
var dbTools = require('../models/DatabaseTools');
var router = express.Router();

/* GET Limit-UI page. */
router.get('/', function(req, res, next) {
  res.render('limitsFrontpage');
});

router.get('/helpdesk', function(req, res, next){
  dbTools.createHelpdeskThreshold(50,50,420);
  res.render('limitsHelpdesk');
}); 

router.get('/power', function(req, res, next){
  res.render('limitsPower');
}); 

router.get('/water', function(req, res, next){
  res.render('limitsWater');
}); 

module.exports = router;