const fs = require('fs');
const fsPromises = require('fs').promises;
const csv = require('csv-parser');
const XLSX = require('xlsx');
const databaseTools = require('./DatabaseTools');
const createCsvWriter = require('csv-writer');
const path = require('path');

exports.convertXlsxToCsv = function (inputFilePath, outputFilePath) {
    const workBook = XLSX.readFile(inputFilePath);
    XLSX.writeFile(workBook, outputFilePath, {bookType: "csv", FS: ";"});
    return true;
};

exports.convertCsvToJson = async function (path, trimUntil, headers = true) {
    if (trimUntil)
        await trimLines(path, trimUntil);

    let results = [];
    let csvOptions = headers ? {separator: ';'} : {separator: ';', headers: false};

    return new Promise((resolve, reject) => {
        fs.createReadStream(path)
            .pipe(csv(csvOptions))
            .on('data', (chunk) => {
                let rowAllEmpty = true;

                for (let property in chunk) {
                    if (chunk.hasOwnProperty(property) && chunk[property].length > 0) {
                        rowAllEmpty = false;
                        break;
                    }
                }

                if (!rowAllEmpty)
                    results.push(chunk);
            })
            .on('error', err => reject(err))
            .on('end', () => resolve(results));
    });
};

async function trimLines(path, trimUntil) {
    let result = "";

    let trimmedResult = await new Promise((resolve, reject) => {
        fs.createReadStream(path)
            .on('data', (chunk) => result += chunk.toString())
            .on('error', err => reject(err))
            .on('end', () => resolve(result.slice(result.indexOf(trimUntil))));
    });

    await fsPromises.writeFile(path, trimmedResult);
}

exports.createCsvPriorityCard = async function () {
    let baseDir = __dirname.slice(0, __dirname.indexOf("Daplex") + 6);
    let dir = path.join(baseDir, 'models/temp', 'pk.csv');

    const csvWriter = createCsvWriter.createObjectCsvWriter({
        fieldDelimiter: ';', path: dir,
        header: [
            {id: 'property_id', title: 'Ejendoms-id'},
            {id: 'property_name', title: 'Ejendom'},
            {id: 'property_size', title: 'Størrelse'},
            {id: 'property_type_id', title: 'Ejendomstype-id'},
            {id: 'color', title: 'Farve'}
        ]
    });
    let results = await databaseTools.readProperty();
    let arrayOfObjects = [];
    for (let result of results) {
        arrayOfObjects.push(result.dataValues);
    }
    await csvWriter.writeRecords(arrayOfObjects);
};

// exports.createCsvPriorityCard();