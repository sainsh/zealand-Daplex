var express = require('express');
var dbTools = require('../models/DatabaseTools');
var router = express.Router();

/* GET Limit-UI page. */
router.get('/', function(req, res, next) {
  res.render('limitsFrontpage');
});

router.get('/helpdesk', function(req, res, next){
  res.render('limitsHelpdesk');
}); 

router.get('/helpdesk/create', function(req, res, next){
  //Inserting data in Thresholds DB
  dbTools.createHelpdeskThreshold(50,50,420);
});

router.get('/helpdesk/read', function(req, res, next){

  //Inserting data in Thresholds DB
  dbTools.readHelpdeskThreshold(1);
  
});

router.get('/power', function(req, res, next){
  res.render('limitsPower');
}); 

router.get('/water', function(req, res, next){
  res.render('limitsWater');
}); 

module.exports = router;