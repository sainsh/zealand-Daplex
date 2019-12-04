//const databaseTools = require('../models/DatabaseTools');
//const conversionTools = require('../models/ConversionTools')
//require('mysql2/node_modules/iconv-lite').encodingExists('foo');
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});
/*
test('test create database',() => {
    expect(databaseTools.setupDatabase('localhost', 'root', 'password')).toBeTruthy();
});

test('test create database with wrong username',  () => {
    expect(databaseTools.setupDatabase(user = "bob", password = "sdf")).rejects.toThrow()
});

/* test works but writes files which GIT does not like
test('insert data from csv', async() =>{
    let csv = await conversionTools.convertXlsxToCsv('./test/testfiles/helpdesk.xlsx', './test/testfiles/helpdesk.csv')
    let jsonResult = await conversionTools.convertCsvToJson('./test/testfiles/Helpdesk.csv', 'Nr.');
    let result = await databaseTools.createHelpdeskData(jsonResult);
    let res = await databaseTools.readProperty(1);
    await expect(res[0].dataValues).toEqual({color: null, property_id:1, property_name: 'Kildemarksvej 114 + 118 - 128', property_size: 100, property_type_id: 420 })
})

test('try reading from properties where id is not a number', async()=>{
    expect(databaseTools.readProperty('to')).rejects.toThrow();

})
/*
test('inserting data into maintenanceTable', async()=>{
    let csv = await conversionTools.convertXlsxToCsv('./test/testfiles/Tilstand fra Dalux.xlsx', './test/testfiles/tilstand.csv')
    let jsonResult = await conversionTools.convertCsvToJson('./test/testfiles/tilstand.csv');
    let result = await databaseTools.createMaintenanceData(jsonResult);
    let res = await databaseTools.readMaintenanceData(5);
    await expect(res[0].dataValues).toEqual({maintenance_id: 1, property_id: 5, cost: 3250})
})*/
