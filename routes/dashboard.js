var express = require('express');
var router = express.Router();

var db = require('../models/DatabaseTools');

/* GET home page. */
router.get('/', async function(req, res, next) {

  var helpdeskCategories = await db.hct.read();
  var propertyTypes = await db.prtt.read();


  res.render('dashboard', { 
    helpdeskCategories: helpdeskCategories, 
    conditionCategories: helpdeskCategories, 
    propertyTypes: propertyTypes});

});

/* POST save data when save button is pressed */
router.post('/save', async function(req, res, next) {

  console.log('helpdesk post route');

  //take and handle form data!!!

  console.log(req.body);

  res.send();
  

});


router.post('/getData', async function(req, res, next) {
  let json = {yellow: -1, red: -1, weight: -1};
  let propertyIdSearch = req.body.property_type === '0' ? '0' : await db.propt.read(req.body.property_type);
  let propertyId = propertyIdSearch === '0' ? '0' : propertyIdSearch[0].dataValues.type_id;
  console.log(req.body.category + propertyId + req.body.category_option);
  let weightsAndThresholds = await db.readThresholdsAndWeights(req.body.category, propertyId, req.body.category_option);
  console.log(weightsAndThresholds);

  json.yellow = weightsAndThresholds[0].dataValues.threshold_yellow;
  json.red = weightsAndThresholds[0].dataValues.threshold_red;
  json.weight = weightsAndThresholds[0].dataValues.weight;

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