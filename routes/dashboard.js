var express = require('express');
var router = express.Router();

var db = require('../models/DatabaseTools');

/* GET home page. */
router.get('/', async function(req, res, next) {

  var helpdeskCategories = await db.hct.read();

  res.render('dashboard', {helpdeskCategories: helpdeskCategories, conditionCategories: helpdeskCategories});

});

/* POST save data when save button is pressed */
router.post('/saveinputdata', async function(req, res, next) {

  //take and handle form data!!!

  console.log("Yellow = " + req.body.yellowThreshold);
  console.log("Red = " + req.body.redThreshold);
  console.log("Weight = " + req.body.weightslider);

  res.redirect('/dashboard');
  

});

module.exports = router;