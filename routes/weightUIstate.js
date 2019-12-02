var express = require('express');
var db = require('../models/DatabaseTools')
var router = express.Router();


router.get('/', function (req, res, next) {
    res.render('weightUIstate');
});

router.post('/', (req, res, next) => {

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


module.exports = router;
