var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({
    dest: '../models/temp',
});
// const conversionTools = require('../models/ConversionTools');
// const databaseTools = require('../models/DatabaseTools');

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

router.get('/', function (req, res, next) {
    res.render('import');
});

router.post('/csv', upload.single('csv-file'), function (req, res, next) {
    let test = req.file;
    console.log(test);
    res.redirect("/import");
});

router.post('/xlsx', upload.single('xlsx-file'), async function (req, res, next) {
    // let outputFilePath = req.file.path + "-converted";
    // conversionTools.convertXlsxToCsv(req.file.path, outputFilePath);
    // let jsonResult = await conversionTools.convertCsvToJson(outputFilePath);
    // console.log(jsonResult);
    // let results = databaseTools.createHelpdesk(jsonResult);
    // console.log(results);
    res.redirect("/import");
});

module.exports = router;