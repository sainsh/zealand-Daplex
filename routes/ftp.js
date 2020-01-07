var express = require('express');
var router = express.Router();
var ftpTools = require('../models/FtpTools');
var databaseTools = require('../models/DatabaseTools');
var conversionTools = require('../models/ConversionTools');

router.get('/', async(req, res, next) => {
    var list = await ftpTools.listDir();
    res.render('ftp', {dir: list});
});

router.post('/xlsx', async(req,res,next) =>{
    console.log(req.body);

    let outputFilePath = `./models/temp/${req.body.file}-converted`;
    let inputFilePath = await ftpTools.downloadFile(req.body.file);
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

router.post('/csv', async(req,res,next) =>{
    let test = req.body.file;
    let jsonResult = await conversionTools.convertCsvToJson(test);
    switch (req.body.kategori) {
        case 'Helpdesk':
            var idResults = databaseTools.createHelpdeskData(jsonResult);
            break;
        case 'Tilstand':
            idResults=databaseTools.createMaintenanceData(jsonResult);
            break;
    }
    console.log(`${req.body.kategori}:  ${new Date()}`);
    res.redirect("/ftp/");
});

module.exports = router;