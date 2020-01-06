var express = require('express');
var router = express.Router();
var ftp = require('../models/FtpTools')
var db = require('../models/DatabaseTools')
var ct = require('../models/ConversionTools')


router.get('/', async(req, res, next) => {
    var list = await ftp.listDir();
    res.render('ftp', {dir: list});
});

router.post('/xlsx', async(req,res,next) =>{
    console.log(req.body);

    let outputFilePath = `./models/temp/${req.body.file}-converted`;
    let inputFilePath = await ftp.downloadFile(req.body.file);
    ct.convertXlsxToCsv(inputFilePath, outputFilePath);
    let jsonResult;
    let idResults;
    switch (req.body.kategori) {
        case 'Helpdesk':
            jsonResult = await ct.convertCsvToJson(outputFilePath, "Nr.;");
            idResults = db.createHelpdeskData(jsonResult);
            break;
        case 'Tilstand':
            jsonResult = await ct.convertCsvToJson(outputFilePath, "Status;");
            idResults = db.createMaintenanceData(jsonResult);
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