var express = require('express');
var db = require('../models/DatabaseTools')
var router = express.Router();


router.get('/', function (req, res, next) {
  res.render('weightUI');
});

router.post('/', (req, res, next) => {
  
  var indeslider = req.body.indeSlider;
  console.log(indeslider);
  var udvSlider = req.body.udvSlider;
  var murSlider = req.body.murSlider;
  var tagSlider = req.body.tagSlider;
  var udSlider = req.body.udSlider;
  var tagDækSlider = req.body.tagDækSlider;
  var tekSlider = req.body.tekSlider;
  var tagrenSlider = req.body.tagrenSlider;
  var funSlider = req.body.funSlider;
  var vinSlider = req.body.vinSlider;
  var select = req.body.select;
  
  var data = [indeslider, udvSlider, murSlider, tagSlider, udSlider, tagDækSlider, tagrenSlider, vinSlider, funSlider, tekSlider, select];
  db.createHelpdeskWeightTable(data);
 //res.redirect('/weightUI/');
})
module.exports = router;