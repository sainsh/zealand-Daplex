const fs = require('fs');
const fsPromises = require('fs').promises;
const csv = require('csv-parser');
const XLSX = require('xlsx');

exports.convertXlsxToCsv = function (inputFilePath, outputFilePath) {
    const workBook = XLSX.readFile(inputFilePath);
    XLSX.writeFile(workBook, outputFilePath, {bookType: "csv", FS: ";"});
};

exports.convertCsvToJson = async function (path) {
    await trimLines(path, "Nr.;");

    let results = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(path)
            .pipe(csv({separator: ';'}))
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