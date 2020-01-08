var express = require('express');
var router = express.Router();

var db = require('../models/DatabaseTools');

/* GET home page. */
router.get('/', async function(req, res, next) {

  var helpdeskCategories = await db.hct.read();

  res.render('dashboard', {helpdeskCategories: helpdeskCategories, conditionCategories: helpdeskCategories});

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

module.exports = router;