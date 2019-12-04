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
  dbTools.createHelpdeskThreshold(2,2,1000);
  res.send();
});

router.get('/helpdesk/read', function(req, res, next){

  //Inserting data in Thresholds DB
  dbTools.readHelpdeskThreshold(1000);
  res.send();

});

router.get('/helpdesk/update', function(req, res, next){

  //Inserting data in Thresholds DB
  dbTools.updateHelpdeskThreshold(1,420,25,500);
  res.send();

});

router.get('/power', function(req, res, next){
  res.render('limitsPower');
}); 

router.get('/water', function(req, res, next){
  res.render('limitsWater');
}); 

router.get('/water/create', function(req, res, next){
  //Inserting data in water Thresholds DB
  dbTools.createWaterThreshold(1,100,1000);
  res.send();
});

router.get('/water/read', function(req, res, next){

  //Inserting data in water Thresholds DB
  dbTools.readWaterThreshold(420);
  res.send();

});

module.exports = router;