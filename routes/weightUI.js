var express = require('express');
var db = require('../models/DatabaseTools')
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('weightUI');
});
router.get('/helpdesk', function (req, res, next) {
  res.render('weightUIhelpdesk');
});
router.get('/state', function (req, res, next) {
  res.render('weightUIstate');
});
router.get('/overall', function (req, res, next) {
  res.render('weightUIoverall');
});

//function to set sliders to current value from database
router.post('/helpdesk/sliders', async function (req, res) {
  var result = await db.readHelpdeskWeightData(req.body.id);
  console.log("Search result: " + JSON.stringify(result));
  res.send('weightUIhelpdesk');
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
  res.redirect("/weightUI/helpdesk/#top");
  //res.redirect('/weightUI/');
})

router.post('/state', (req, res, next) => {

  var select = req.body.select;
  var tekSlider = req.body.tekSlider;
  var udvSlider = req.body.udvSlider;
  var osvSlider = req.body.osvSlider;


  var data = [select, tekSlider, udvSlider, osvSlider];
  db.createStateWeightTable(data);
  db.updateStateWeightTable(data);
  res.redirect("/weightUI/state/#top");
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
  res.redirect("/weightUI/overall/#top");
  //res.redirect('/weightUI/');
})






module.exports = router;
