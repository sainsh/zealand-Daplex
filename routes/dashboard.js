var express = require('express');
var router = express.Router();

var db = require('../models/DatabaseTools');

/* GET home page. */
router.get('/', async function(req, res, next) {

  var helpdeskCategories = await db.hct.read();
  var propertyTypes = await db.prtt.read();

  var helpdeskTresholdData;
  var conditionThresholdData;
  var energyThresholdData;

  try{
    helpdeskTresholdData = await db.ht.read();
    //conditionThresholdData = await db.ct.read();
    //energyThresholdData = [await db.ept.read(), await db.ewt.read(), await db.eht.read()]
  } catch(e){
    helpdeskTresholdData = fillThresholdObjOnError();
  }

  res.render('dashboard', { 
    helpdeskCategories: helpdeskCategories, 
    conditionCategories: helpdeskCategories, 
    propertyTypes: propertyTypes, 
    helpdeskThresholdData: helpdeskTresholdData});

});

/* POST save data when save button is pressed */
router.post('/helpdesk', async function(req, res, next) {

  console.log('helpdesk post route');

  //take and handle form data!!!

  console.log("Yellow = " + req.body.yellowThreshold);
  console.log("Red = " + req.body.redThreshold);
  console.log("Weight = " + req.body.weightslider);
  console.log("category = " + req.body.category);

  res.redirect('/dashboard#helpdesk');
  

});

/* POST save data when save button is pressed */
router.post('/condition', async function(req, res, next) {

  console.log('condition post route');

  //take and handle form data!!!

  console.log("Yellow = " + req.body.yellowThreshold);
  console.log("Red = " + req.body.redThreshold);
  console.log("Weight = " + req.body.weightslider);
  console.log("category = " + req.body.category);

  res.redirect('/dashboard#condition');
  

});

/* POST save data when save button is pressed */
router.post('/energy', async function(req, res, next) {

  console.log('energy post route');

  //take and handle form data!!!

  console.log("Yellow = " + req.body.yellowThreshold);
  console.log("Red = " + req.body.redThreshold);
  console.log("Weight = " + req.body.weightslider);
  console.log("category = " + req.body.category);

  res.redirect('/dashboard#energy');
  
});

router.post('/getData', async function(req, res, next) {
  let json = {yellow: -1, red: -1, weight: -1};
  if (req.body.category >= 0 && req.body.property_type >= 0 && req.body.category_option >= 0){
    let propertyIdSearch = await db.propt.read(req.body.property_type);
    let propertyId = propertyIdSearch[0].dataValues.type_id;

    if(req.body.category == 0){
      let thresholdData = await db.epth.read(propertyId);
      json.yellow = thresholdData[0].dataValues.threshold_yellow;
      json.red = thresholdData[0].dataValues.threshold_red;
      let weightData = await db.readEnergiWeight(propertyId);
      json.weight = weightData[0].dataValues.overall_energi;
    }else if (req.body.category == 1){
      let thresholdData = await db.ct.read(propertyId);
      json.yellow = thresholdData[0].dataValues.threshold_yellow;
      json.red = thresholdData[0].dataValues.threshold_red;
      json.weight = weightData[0].dataValues.overall_tilstand;
    }else if (req.body.category == 2){
      let thresholdData = await db.ht.read(propertyId);
      json.yellow = thresholdData[0].dataValues.threshold_yellow;
      json.red = thresholdData[0].dataValues.threshold_red;
      json.weight = weightData[0].dataValues.overall_helpdesk;
    }

  }else if(req.body.category >= 0 && req.body.property_type >= 0){
    let propertyIdSearch = await db.propt.read(req.body.property_type);
    let propertyId = propertyIdSearch[0].dataValues.type_id;
    let weightData = await db.readOverallWeightData(propertyId);

    if(req.body.category == 0){
      let thresholdData = await db.epth.read(propertyId);
      json.yellow = thresholdData[0].dataValues.threshold_yellow;
      json.red = thresholdData[0].dataValues.threshold_red;
      json.weight = weightData[0].dataValues.overall_energi;
    }else if (req.body.category == 1){
      let thresholdData = await db.ct.read(propertyId);
      json.yellow = thresholdData[0].dataValues.threshold_yellow;
      json.red = thresholdData[0].dataValues.threshold_red;
      json.weight = weightData[0].dataValues.overall_tilstand;
    }else if (req.body.category == 2){
      let thresholdData = await db.ht.read(propertyId);
      json.yellow = thresholdData[0].dataValues.threshold_yellow;
      json.red = thresholdData[0].dataValues.threshold_red;
      json.weight = weightData[0].dataValues.overall_helpdesk;
    }

  }else if(req.body.category >= 0){
    let weightData = await db.readOverallWeightData(0);

    if(req.body.category == 0){
      let thresholdData = await db.epth.read(0);
      json.yellow = thresholdData[0].dataValues.threshold_yellow;
      json.red = thresholdData[0].dataValues.threshold_red;
      json.weight = weightData[0].dataValues.overall_energi;
    }else if (req.body.category == 1){
      let thresholdData = await db.ct.read(0);
      json.yellow = thresholdData[0].dataValues.threshold_yellow;
      json.red = thresholdData[0].dataValues.threshold_red;
      json.weight = weightData[0].dataValues.overall_tilstand;
    }else if (req.body.category == 2){
      let thresholdData = await db.ht.read(0);
      json.yellow = thresholdData[0].dataValues.threshold_yellow;
      json.red = thresholdData[0].dataValues.threshold_red;
      json.weight = weightData[0].dataValues.overall_helpdesk;
    }
  }
  res.send(JSON.stringify(json));

});

fillThresholdObjOnError = () => {

  /* id	property_id	helpdesk_category_id	threshold_yellow	threshold_red */

  let obj = {};
  obj.id = 'no data'
  obj.property_id = 'no data'
  obj.helpdesk_category_id = 'no data'
  obj.threshold_yellow = '0'
  obj.threshold_red = '0'

  return obj;
}

module.exports = router;