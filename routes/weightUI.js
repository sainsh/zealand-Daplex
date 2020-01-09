var express = require('express');
var db = require('../models/DatabaseTools')
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('weightUI');
});
router.get('/helpdesk', async function (req, res, next) {
  var result = await db.readHelpdeskWeight(420);
  var resultArray = [];
  var leftArray = [];
//KIG HER
  for (var value in result){
    resultArray.push(value);
    console.log(value + "Value");
    leftArray.push(`left:` + (0) + `px`);
  }
    console.log(resultArray);
    
  resultArray.shift();
  leftArray.shift();
  res.render('weightUIhelpdesk', {values: resultArray, left_array: leftArray});
});

router.get('/state', async function (req, res, next) {
  var result = await db.readStateWeight(420);
  var resultArray = [];
  var leftArray = [];
  await console.log(result);
  
  for (var value in result){
    resultArray.push(value.weight);
    console.log(value + "Value");
    leftArray.push(`left:` + (0) + `px`);
  }
  console.log(resultArray);
  resultArray.shift();
  leftArray.shift();
  res.render('weightUIstate', {values: resultArray, left_array: leftArray});
});

router.get('/overall', async function (req, res, next) {
  var result = await db.readOverallWeightData(420);
  var resultArray = [];
  var leftArray = [];
  console.log(result);
  for (var value in result){
    resultArray.push(result[value]);
    leftArray.push(`left:` + (0) + `px`);
  }
  resultArray.shift(); 
  leftArray.shift();
  res.render('weightUIoverall', {values: resultArray, left_array: leftArray});
});

//function to set sliders to current value from database
router.post('/helpdesk/sliders', async function (req, res) {
  var result = await db.readHelpdeskWeight(req.body.id);
  var resultArray = [];
  for (var value in result){
    resultArray.push(result[value]);
  }
  resultArray.shift();
  res.send(resultArray);
});

router.post('/state/sliders', async function (req, res) {
  var result = await db.readStateWeight(req.body.id);
  var resultArray = [];
  console.log(result);
  for (var value in result){
    resultArray.push(result[value]);
  }
  resultArray.shift();
  res.send(resultArray);
});

router.post('/overall/sliders', async function (req, res) {
  var result = await db.readOverallWeightData(req.body.id);
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

  //-TODO- Lav if statement der bruger read+ lav read til også at bruge bygningstype. samt i update.
  //De er sat i data så det passer med de relevante helpdesk catogorier så data[1] = indeklima værdi, samt catogory id 1. 
  var data = [select, indeSlider, udvSlider, tekSlider, tagSlider, murSlider, udSlider, tagDækSlider, tagrenSlider, vinSlider, funSlider];
  db.deleteHelpdeskWeight(data[0]);
  console.log("Clearing database.....");
  console.log("inserting new data in database....."); //These console logs slows the process enough to make this work
  db.createHelpdeskWeightTable(1, data[0], data[1]); // så Catogori id, bygningstype, weight.
  db.createHelpdeskWeightTable(2, data[0], data[2]);
  db.createHelpdeskWeightTable(3, data[0], data[3]);
  db.createHelpdeskWeightTable(4, data[0], data[4]);
  db.createHelpdeskWeightTable(5, data[0], data[5]);
  db.createHelpdeskWeightTable(6, data[0], data[6]);
  db.createHelpdeskWeightTable(7, data[0], data[7]);
  db.createHelpdeskWeightTable(8, data[0], data[8]);
  db.createHelpdeskWeightTable(9, data[0], data[9]);
  db.createHelpdeskWeightTable(10, data[0], data[10]);
  res.redirect("/weightUI");
})

router.post('/state', (req, res, next) => {
  var select = req.body.select;
  var tekSlider = req.body.tekSlider;
  var udvSlider = req.body.udvSlider;
  var osvSlider = req.body.osvSlider;


  var data = [select, tekSlider, udvSlider, osvSlider];
  db.deleteStateWeight(data[0]);
  console.log("Clearing database.....");
  console.log("inserting new data in database.....");
  db.readStateWeight(data[0]); //Added read to avoid nothing in database. cant read propperly
  db.createStateWeightTable(3, data[0], data[1]);
  db.createStateWeightTable(2, data[0], data[2]);
  db.createStateWeightTable(1, data[0], data[3]);
  res.redirect("/weightUI/");
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
