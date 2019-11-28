const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});
/* Test works but makes Github Action fail, since it cant create filesnpm 
const conversionTools = require('../models/ConversionTools');
const fs = require('fs');
const path = require('path');

test('inputFile.xlsx gets converted to .csv file', () => {
    expect(conversionTools.convertXlsxToCsv('./test/testfiles/Helpdesk.xlsx', './test/testfiles/Helpdesk.csv')).toBeTruthy();
});

test('convertion CSV to JSON', () => {
    expect(conversionTools.convertCsvToJson('./test/testfiles/Helpdesk.csv')).toBeTruthy();
});

function getFileContent(path) {
    let result = "";
    return new Promise((resolve, reject) => {
        fs.createReadStream(path)
            .on('data', (chunk) => result += chunk.toString())
            .on('error', err => reject(err))
            .on('end', () => resolve(result));
    });
}

test('create CSV priority card from database data', async () => {
    let baseDir = __dirname.slice(0, __dirname.indexOf("Daplex") + 6);
    let dir1 = path.join(baseDir, 'test/testfiles', 'pk-test.csv');
    let dir2 = path.join(baseDir, 'models/temp', 'pk.csv');
    await conversionTools.createCsvPriorityCard();
    let testFileContent = await getFileContent(dir1);
    let newFileContent = await getFileContent(dir2);
    expect(testFileContent).toEqual(newFileContent);
});*/