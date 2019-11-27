const databaseTools = require('../models/DatabaseTools');
const conversionTools = require('../models/ConversionTools')
require('mysql2/node_modules/iconv-lite').encodingExists('foo');

test('test create database',() => {
    expect(databaseTools.setupDatabase('localhost', 'root', 'admin')).toBeTruthy();
});

test('test create database with wrong username',  () => {
    expect(databaseTools.setupDatabase(user = "bob", password = "sdf")).rejects.toThrow()
});


test('insert data from csv', async() =>{
    let jsonResult = await conversionTools.convertCsvToJson('test/testfiles/Helpdesk.csv');
    let result = await databaseTools.createHelpdesk(jsonResult);
    let res = await databaseTools.readProperty(1);
    expect(res[0].dataValues).toEqual({property_id:1, property_name: 'Kildemarksvej 114 + 118 - 128' })
})

test('try reading from properties where id is not a number', async()=>{
    expect(databaseTools.readProperty('to')).rejects.toThrow();

})
