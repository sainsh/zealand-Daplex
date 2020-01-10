var express = require('express');
var router = express.Router();
var ftpTools = require('../models/FtpTools');
var databaseTools = require('../models/DatabaseTools');
var conversionTools = require('../models/ConversionTools');
let unknownProperties;
let savedJsonResult;

router.get('/', async (req, res, next) => {
    let list = await ftpTools.listDir("/");
    res.render('ftp', {dir: list});
});

router.post('/xlsx', async (req, res, next) => {
    console.log(req.body);
    let inputFilePath = await ftpTools.downloadFile(req.body.file);
    let outputFilePath = inputFilePath + "-converted";
    conversionTools.convertXlsxToCsv(inputFilePath, outputFilePath);
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
    }
    console.log(`${req.body.kategori}: ${new Date()}`);
    res.redirect("/ftp/");
});

router.post('/csv', async (req, res, next) => {
    let filePath = await ftpTools.downloadFile(req.body.file);
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
            idResults = databaseTools.createWaterData(jsonResult, req.body.file);
            break;
        case 'Varmedata':
            jsonResult = await conversionTools.convertCsvToJson(filePath, "#Energi;", false);
            unknownProperties = await databaseTools.checkProperties(jsonResult);
            if (Object.keys(unknownProperties).length > 0) {
                savedJsonResult = jsonResult;
                res.render('inputProperties', {
                    unknownProperties: unknownProperties,
                    sendPostRequestTo: '/ftp/heatData'
                });
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
    res.redirect("/ftp/");
});

router.post('/heatData', function (req, res, next) {
    let idResults = databaseTools.createHeatData(savedJsonResult, req.body);
    unknownProperties = null;
    savedJsonResult = null;
    res.redirect("/ftp");
});

module.exports = router;
