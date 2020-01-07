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
  //Inserting data in Thresholds DB with data
  dbTools.createHelpdeskThreshold(2, 2, 2, 1000);
  dbTools.createHelpdeskThreshold(5, 8, 2, 900);
  dbTools.createHelpdeskThreshold(3, 5, 2, 650);
  dbTools.createHelpdeskThreshold(5, 9, 5, 420);
  dbTools.createHelpdeskThreshold(9, 10, 8, 110);
  dbTools.createHelpdeskThreshold(1, 8, 25, 600);
  dbTools.createHelpdeskThreshold(8, 15, 5, 1000);
  
  dbTools.hct.create("Indeklima");
  dbTools.hct.create("Tekniske Anlæg");
  dbTools.hct.create("Udvendig Belægning");
  dbTools.hct.create("Murværk og Facade");
  dbTools.hct.create("Tag");
  dbTools.hct.create("Udhæng og Gavle");
  dbTools.hct.create("Tagdækning");
  dbTools.hct.create("Tagrender og Nedløb");
  dbTools.hct.create("Vinduer og Udvendige Døre");
  dbTools.hct.create("Fundament og Sokkel");
  
  res.send();
});

router.get('/helpdesk/read', function(req, res, next){
  //reading data in Thresholds DB by property id
  dbTools.readHelpdeskThreshold(3);

  dbTools.hct.read(2);

  res.send();
});

router.get('/helpdesk/update', function(req, res, next){
  //update data in Thresholds DB 
  dbTools.updateHelpdeskThreshold(1,420,25, 5, 500);

  dbTools.hct.update(4, "Ny værdi wow");
  res.send();
});

router.get('/helpdesk/delete', function(req, res, next){
  //delete data in Thresholds DB by id
  dbTools.deleteHelpdeskThreshold(4);

  dbTools.hct.delete(3);

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

router.get('/heat', function(req, res, next){
  res.render('limitsHeat');
}); 

router.get('/heat/create', function(req, res, next){
  //Inserting data in heat Thresholds DB
  dbTools.createHeatThreshold(2,500,1000);
  dbTools.createHeatThreshold(3,5,900);
  dbTools.createHeatThreshold(6,9,850);
  dbTools.createHeatThreshold(7,15,700);
  dbTools.createHeatThreshold(1,10,400);
  dbTools.createHeatThreshold(9,20,140);
  res.send();
});

router.get('/heat/read', function(req, res, next){

  //Inserting data in heat Thresholds DB
  dbTools.readHeatThreshold(420);
  res.send();

});

router.get('/heat/update', function(req, res, next){
  //update data in heat Thresholds DB 
  dbTools.updateHeatThreshold(1,420,25,500);
  res.send();
});

router.get('/heat/delete', function(req, res, next){
  //delete data in heat Thresholds DB by id
  dbTools.deleteHeatThreshold(4);
  res.send();
});
/** 
router.get('/damage', function(req, res, next){
  res.render('limitsHeat');
}); 
*/
router.get('/damage/create', function(req, res, next){
  //Inserting data in damage Thresholds DB
  dbTools.createDamageThreshold(2,500,1000);
  dbTools.createDamageThreshold(3,5,900);
  dbTools.createDamageThreshold(6,9,850);
  dbTools.createDamageThreshold(7,15,700);
  dbTools.createDamageThreshold(1,10,400);
  dbTools.createDamageThreshold(9,20,140);
  res.send();
});

router.get('/damage/read', function(req, res, next){

  //Inserting data in damage Thresholds DB
  dbTools.readDamageThreshold(420);
  res.send();

});

router.get('/damage/update', function(req, res, next){
  //update data in damage Thresholds DB 
  dbTools.updateDamageThreshold(1,420,25,500);
  res.send();
});

router.get('/damage/delete', function(req, res, next){
  //delete data in damage Thresholds DB by id
  dbTools.deleteDamageThreshold(4);
  res.send();
});

// get input from ui and save to database
router.post('/helpdesk', (req, res, next) => {

  var yellowThreshold = req.body.yellowThreshold;
  var redThreshold = req.body.redThreshold;
  var catagory = req.body.catagory;
  var property = req.body.select;

  if(catagory == "indeklima"){
    catagory = 1;
  } else if(catagory == "væg"){
    catagory = 2;
  } else {
    catagory = 404;
  }

  if(property == "skole"){
    property = 420;
  } else if(property == "plejehjem"){
    property = 410;
  } else {
    property = 404; 
  }

  console.log(req.body);

  dbTools.createHelpdeskThreshold(yellowThreshold, redThreshold, catagory, property);
  // dbTools.updateHelpdeskThreshold(yellowThreshold, redThreshold, catagory, property);
  res.redirect("/limits/helpdesk");
  
});

router.post('/water', (req, res, next) => {

  var yellowThreshold = req.body.yellowThreshold;
  var redThreshold = req.body.redThreshold;
  var property = req.body.select;

  if(property == "skole"){
    property = 420;
  } else if(property == "plejehjem"){
    property = 410;
  } else {
    property = 404; 
  }

  console.log(req.body);

  dbTools.createWaterThreshold(yellowThreshold, redThreshold, property);
  res.redirect("/limits/water");
});

router.post('/power', (req, res, next) => {

  var yellowThreshold = req.body.yellowThreshold;
  var redThreshold = req.body.redThreshold;
  var property = req.body.select;

  if(property == "skole"){
    property = 420;
  } else if(property == "plejehjem"){
    property = 410;
  } else {
    property = 404; 
  }

  console.log(req.body);

  dbTools.createPowerThreshold(yellowThreshold, redThreshold, property);
  res.redirect("/limits/power");
});

router.post('/heat', (req, res, next) => {

  var yellowThreshold = req.body.yellowThreshold;
  var redThreshold = req.body.redThreshold;
  var property = req.body.select;

  if(property == "skole"){
    property = 420;
  } else if(property == "plejehjem"){
    property = 410;
  } else {
    property = 404; 
  }

  console.log(req.body);

  dbTools.createHeatThreshold(yellowThreshold, redThreshold, property);
  res.redirect("/limits/heat");
});

module.exports = router;