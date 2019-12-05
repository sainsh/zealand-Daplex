var express = require('express');
var dbTools = require('../models/DatabaseTools');
var thresholdDbTools = require('../models/ThresholdsDbTools')
var router = express.Router();

/* GET Limit-UI page. */
router.get('/', function(req, res, next) {
  res.render('limitsFrontpage');
});

router.get('/helpdesk', function(req, res, next){
  res.render('limitsHelpdesk');
}); 

router.get('/helpdesk/create', function(req, res, next){
  //Inserting data in Thresholds DB with data
  dbTools.createHelpdeskThreshold(2, 2, 2, 1000);
  dbTools.createHelpdeskThreshold(5, 8, 2, 900);
  dbTools.createHelpdeskThreshold(3, 5, 2, 650);
  dbTools.createHelpdeskThreshold(5, 9, 5, 420);
  dbTools.createHelpdeskThreshold(9, 10, 8, 110);
  dbTools.createHelpdeskThreshold(1, 8, 25, 600);
  dbTools.createHelpdeskThreshold(8, 15, 5, 1000);
  res.send();
});

router.get('/helpdesk/read', function(req, res, next){
  //reading data in Thresholds DB by property id
  dbTools.readHelpdeskThreshold(1000);
  res.send();
});

router.get('/helpdesk/update', function(req, res, next){
  //update data in Thresholds DB 
  dbTools.updateHelpdeskThreshold(1,420,25, 5, 500);
  res.send();
});

router.get('/helpdesk/delete', function(req, res, next){
  //delete data in Thresholds DB by id
  dbTools.deleteHelpdeskThreshold(4);
  res.send();
});


router.get('/water', function(req, res, next){
  res.render('limitsWater');
}); 

router.get('/water/create', function(req, res, next){
  //Inserting data in water Thresholds DB
  dbTools.createWaterThreshold(1,100,1000);
  dbTools.createWaterThreshold(2,5,900);
  dbTools.createWaterThreshold(3,14,450);
  dbTools.createWaterThreshold(10,20,200);
  dbTools.createWaterThreshold(7,19,150);
  dbTools.createWaterThreshold(4,5,800);
  res.send();
});

router.get('/water/read', function(req, res, next){

  //Inserting data in water Thresholds DB
  dbTools.readWaterThreshold(420);
  res.send();

});

router.get('/water/update', function(req, res, next){
  //update data in Thresholds DB 
  dbTools.updateWaterThreshold(1,420,25,500);
  res.send();
});

router.get('/water/delete', function(req, res, next){
  //delete data in Thresholds DB by id
  dbTools.deleteWaterThreshold(4);
  res.send();
});

router.get('/power', function(req, res, next){
  res.render('limitsPower');
}); 

router.get('/power/create', function(req, res, next){
  //Inserting data in power Thresholds DB
  dbTools.createPowerThreshold(2,500,1000);
  dbTools.createPowerThreshold(3,5,900);
  dbTools.createPowerThreshold(6,9,850);
  dbTools.createPowerThreshold(7,15,700);
  dbTools.createPowerThreshold(1,10,400);
  dbTools.createPowerThreshold(9,20,140);
  res.send();
});

router.get('/power/read', function(req, res, next){

  //Inserting data in power Thresholds DB
  dbTools.readPowerThreshold(420);
  res.send();

});

router.get('/power/update', function(req, res, next){
  //update data in Thresholds DB 
  dbTools.updatePowerThreshold(1,420,25,500);
  res.send();
});

router.get('/power/delete', function(req, res, next){
  //delete data in Thresholds DB by id
  dbTools.deletePowerThreshold(4);
  res.send();
});

// get input from ui and save to database
router.post('/helpdesk', (req, res, next) => {

  var yellowThreshold = req.body.yellowThreshold;
  var redThreshold = req.body.redThreshold;
  var select = req.body.select;
  console.log(req.body);

  thresholdDbTools.createHelpdeskThreshold(yellowThreshold, redThreshold, select);
  thresholdDbTools.updateHelpdeskThreshold(yellowThreshold, redThreshold, select);
  res.redirect("/limits/helpdesk");
  
})

module.exports = router;