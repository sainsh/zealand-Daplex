var express = require('express');
var db = require('../models/DatabaseTools')
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('weightUI');
});
router.get('/helpdesk', async function (req, res, next) {
  var result = await db.readHelpdeskWeightData(420);
  var resultArray = [];
  var leftArray = [];
  console.log(result);
  for (var value in result){
    resultArray.push(result[value]);
    leftArray.push(`left:` + (result[value] * 5.78) + `px`);
  }
  resultArray.shift();
  leftArray.shift();
  res.render('weightUIhelpdesk', {values: resultArray, left_array: leftArray});
});
router.get('/state', async function (req, res, next) {
  var result = await db.readStateWeightData(420);
  var resultArray = [];
  var leftArray = [];
  console.log(result);
  for (var value in result){
    resultArray.push(result[value]);
    leftArray.push(`left:` + (result[value] * 5.78) + `px`);
  }
  resultArray.shift();
  leftArray.shift();
  res.render('weightUIstate', {values: resultArray, left_array: leftArray});
});

router.get('/overall', function (req, res, next) {
  res.render('weightUIoverall');
});

//function to set sliders to current value from database
router.post('/helpdesk/sliders', async function (req, res) {
  var result = await db.readHelpdeskWeightData(req.body.id);
  var resultArray = [];
  for (var value in result){
    resultArray.push(result[value]);
  }
  resultArray.shift();
  res.send(resultArray);
});

router.post('/state/sliders', async function (req, res) {
  var result = await db.readStateWeightData(req.body.id);
  var resultArray = [];
  console.log(result);
  for (var value in result){
    resultArray.push(result[value]);
  }
  resultArray.shift();
  res.send(resultArray);
});

router.post('/helpdesk', (req, res, next) => {

  var select = req.body.select;
  var indeSlider = req.body.indeSlider;
  var tekSlider = req.body.tekSlider;
  var udvSlider = req.body.udvSlider;
  var murSlider = req.body.murSlider;
  var tagSlider = req.body.tagSlider;
  var udSlider = req.body.udSlider;
  var tagDækSlider = req.body.tagDækSlider;
  var tagrenSlider = req.body.tagrenSlider;
  var vinSlider = req.body.vinSlider;
  var funSlider = req.body.funSlider;

  var data = [select, indeSlider, tekSlider, udvSlider, murSlider, tagSlider, udSlider, tagDækSlider, tagrenSlider, vinSlider, funSlider];
  db.createHelpdeskWeightTable(data);
  db.updateHelpdeskWeightTable(data);
  res.redirect("/weightUI");
})

router.post('/state', (req, res, next) => {

  var select = req.body.select;
  var tekSlider = req.body.tekSlider;
  var udvSlider = req.body.udvSlider;
  var osvSlider = req.body.osvSlider;


  var data = [select, tekSlider, udvSlider, osvSlider];
  db.createStateWeightTable(data);
  db.updateStateWeightTable(data);
  res.redirect("/weightUI/");
  //res.redirect('/weightUI/');
})

router.post('/overall', (req, res, next) => {

  var select = req.body.select;
  var tilsSlider = req.body.tilsSlider;
  var energiSlider = req.body.energiSlider;
  var helpSlider = req.body.helpSlider;


  var data = [select, tilsSlider, energiSlider, helpSlider];
  console.log(`${select} ${tilsSlider} ${energiSlider} ${helpSlider}`);
  db.createOverallWeightTable(data);
  db.updateOverallWeightTable(data);
  res.redirect("/weightUI/");
})

module.exports = router;
