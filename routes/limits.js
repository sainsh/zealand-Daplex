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
  dbTools.createHelpdeskThreshold(2,2,1000);
  dbTools.createHelpdeskThreshold(5,8,900);
  dbTools.createHelpdeskThreshold(3,5,650);
  dbTools.createHelpdeskThreshold(5,9,420);
  dbTools.createHelpdeskThreshold(9,10,110);
  dbTools.createHelpdeskThreshold(1,25,600);
  dbTools.createHelpdeskThreshold(8,15,1000);
  res.send();
});

router.get('/helpdesk/read', function(req, res, next){
  //reading data in Thresholds DB by property id
  dbTools.readHelpdeskThreshold(1000);
  res.send();
});

router.get('/helpdesk/update', function(req, res, next){
  //update data in Thresholds DB 
  dbTools.updateHelpdeskThreshold(1,420,25,500);
  res.send();
});

router.get('/helpdesk/delete', function(req, res, next){
  //delete data in Thresholds DB by id
  dbTools.deleteHelpdeskThreshold(4);
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

router.get('/power/create', function(req, res, next){
  //Inserting data in power Thresholds DB
  dbTools.createPowerThreshold(2,500,1000);
  res.send();
});

router.get('/power/read', function(req, res, next){

  //Inserting data in power Thresholds DB
  dbTools.readPowerThreshold(420);
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