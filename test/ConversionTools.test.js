const conversionTools = require('../models/ConversionTools');


test('inputFile.xlsx gets converted to .csv file', () => {
    expect(conversionTools.convertXlsxToCsv('./test/testfiles/Helpdesk.xlsx','./test/testfiles/Helpdesk.csv')).toBeTruthy();
});

test('convertion CSV to JSON', () => {
    expect(conversionTools.convertCsvToJson('./test/testfiles/Helpdesk.csv')).toBeTruthy();
});
