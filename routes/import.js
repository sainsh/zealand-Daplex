var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
const upload = multer({
    // dest: './models/temp',
    dest: path.join(__dirname.slice(0, __dirname.indexOf("Daplex") + 6), 'models/temp')
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

router.get('/', function (req, res, next) {
    res.render('import');
});

router.post('/csv', upload.single('csv-file'), async function (req, res, next) {
    let test = req.file.path;
    let jsonResult = await conversionTools.convertCsvToJson(test);
    switch (req.body.kategori) {
        case 'Helpdesk':
            var idResults = databaseTools.createHelpdeskData(jsonResult);
            break;
        case 'Tilstand':
            //var idResults=databaseTools.createVedligeholdelseData(jsonResult);
            break;
    }
    console.log(`${req.body.kategori}:  ${new Date()}`);
    res.redirect("/import/");
});

router.post('/xlsx', upload.single('xlsx-file'), async function (req, res, next) {
    let outputFilePath = req.file.path + "-converted";
    conversionTools.convertXlsxToCsv(req.file.path, outputFilePath);
    let jsonResult;
    let idResults;
    switch (req.body.kategori) {
        case 'Helpdesk':
            jsonResult = await conversionTools.convertCsvToJson(outputFilePath, "Nr.;");
            idResults = databaseTools.createHelpdeskData(jsonResult);
            break;
        case 'Tilstand':
            jsonResult = await conversionTools.convertCsvToJson(outputFilePath);
            idResults = databaseTools.createMaintenanceData(jsonResult);
            break;
    }
    console.log(`${req.body.kategori}: ${new Date()}`);
    res.redirect("/import/");
});

module.exports = router;
