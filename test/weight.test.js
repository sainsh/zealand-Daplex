const weight = require('./weight');
var db = require('../models/DatabaseTools')

test('Returns string', () => {
    expect(weight("text")).toBe("text");
});

test('Reads from helpdesk_weight_table', async() =>{
    let mockData = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 420];
    await db.createHelpdeskWeightTable(mockData);
    let result = await db.readHelpdeskWeightData(420);
    console.log(result);
    //expect(result).toBe(mockData);
});