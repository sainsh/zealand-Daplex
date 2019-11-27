var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({
    dest: '../models/temp',
});
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         // cb(null, '/tmp/my-uploads')
//         cb(null, '../model/temp')
//     },
//     filename: function (req, file, cb) {
//         // cb(null, file.fieldname + '-' + Date.now())
//         cb(null, file.originalname)
//     }
// });
// const upload = multer({ storage: storage });
const databaseTools = require('../models/DatabaseTools');
const conversionTools = require('../models/ConversionTools');
const path = require('path');

router.get('/', function (req, res, next) {
    res.render('import');
});

router.get('/getCard', function (req, res, next) {
    res.download(path.join(__dirname, '../models/temp', 'pk.csv'), "Prioriteringskort.csv");
});

router.post('/csv', upload.single('csv-file'), function (req, res, next) {
    let test = req.file;
    console.log(test);
    res.redirect("/import");
});

router.post('/xlsx', upload.single('xlsx-file'), async function (req, res, next) {
    let outputFilePath = req.file.path + "-converted";
    conversionTools.convertXlsxToCsv(req.file.path, outputFilePath);
    let jsonResult = await conversionTools.convertCsvToJson(outputFilePath);
    console.log(jsonResult);
    let idResults = databaseTools.createHelpdesk(jsonResult);
    console.log(idResults);
    res.redirect("/import");
});

module.exports = router;