var express = require('express');
var router = express.Router();

const databaseTools = require('../models/DatabaseTools');
const conversionTools = require('../models/ConversionTools');
const path = require('path');
const fs = require('fs').promises;

router.get('/', function (req, res, next) {
    res.render('export');
});

router.get('/getCard', async function (req, res, next) {
    await databaseTools.calculateScore();
    await conversionTools.createCsvPriorityCard();
    res.download(path.join(__dirname, '../models/temp', 'pk.csv'), "Prioriteringskort.csv");
    // await fs.unlink(path.join(__dirname, '../models/temp', 'pk.csv'));
});

module.exports = router;