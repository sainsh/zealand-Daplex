const databaseTools = require('../models/DatabaseTools');
const conversionTools = require('../models/ConversionTools');
const ftpTools = require('../models/FtpTools');
require('mysql2/node_modules/iconv-lite').encodingExists('foo');


const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});
/*//test works locally, but not on github, since there is no FTP server
test('test connection to ftp server', async() =>{
    var list = await ftpTools.listDir();
    

    expect(list.length>0).toBeTruthy()
})
*/