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
let unknownProperties;
let savedJsonResult;

router.get('/', function (req, res, next) {
    res.render('import', (req.query.xlsxFileUploaded ? { xlsxFileUploaded: true } : {}));
});

router.post('/csv', upload.single('csv-file'), async function (req, res, next) {
    let filePath = req.file.path;
    let jsonResult;
    let idResults;
    switch (req.body.kategori) {
        case 'Helpdesk':
            jsonResult = await conversionTools.convertCsvToJson(filePath, "Nr.;");
            idResults = databaseTools.createHelpdeskData(jsonResult);
            break;
        case 'Tilstand':
            jsonResult = await conversionTools.convertCsvToJson(filePath, "Status;");
            idResults = databaseTools.createMaintenanceData(jsonResult);
            break;
        case 'Vanddata':
            jsonResult = await conversionTools.convertCsvToJson(filePath, "Dato;");
            idResults = databaseTools.createWaterData(jsonResult, req.file.originalname);
            break;
        case 'Varmedata':
            jsonResult = await conversionTools.convertCsvToJson(filePath, "#Energi;", false);
            unknownProperties = await databaseTools.checkProperties(jsonResult);
            if (Object.keys(unknownProperties).length > 0) {
                savedJsonResult = jsonResult;
                res.render('inputProperties', {unknownProperties: unknownProperties});
                return;
            } else
                idResults = databaseTools.createHeatData(jsonResult);
            break;
        case 'El':
            jsonResult = await conversionTools.convertCsvToJson(filePath, "#E17", false);
            idResults = databaseTools.createPower(jsonResult);
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
            jsonResult = await conversionTools.convertCsvToJson(outputFilePath, "Status;");
            idResults = databaseTools.createMaintenanceData(jsonResult);
            break;
        case 'El':
            jsonResult = await conversionTools.convertCsvToJson(outputFilePath, "#E17;");
            idResults = databaseTools.createPower(jsonResult);
            break;
    }
    console.log(`${req.body.kategori}: ${new Date()}`);
    // res.redirect("/import/");
    res.redirect("/import?xlsxFileUploaded=true");
});

router.post('/heatData', function (req, res, next) {
    let idResults = databaseTools.createHeatData(savedJsonResult, req.body);
    unknownProperties = null;
    savedJsonResult = null;
    res.redirect("/import/");
});

module.exports = router;
