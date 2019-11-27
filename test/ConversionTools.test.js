const conversionTools = require('../models/ConversionTools');


test('inputFile.xlsx gets converted to .csv file', () => {
    expect(conversionTools.convertXlsxToCsv('./test/testfiles/Helpdesk.xlsx','./test/testfiles/bob.csv')).toBeTruthy();
});


