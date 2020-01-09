const PromiseFtp = require('promise-ftp');
const fs = require('fs');
const path = require('path');

let host = "localhost";
let user = "testuser";
let password = "testpw";

async function listDir2() {
    var res = ["intet at sende tilbage", "desværre"];
    var ftp = new PromiseFtp();
    await ftp.connect({host: host, user: user, password: password})
        .then(serverMessage => {
            console.log(`Server Message: ${serverMessage}`);
            return ftp.list('/');
        }).then(list => {
            res = list;
            return ftp.end();
        });

    return res;
}

async function listDir(path) {
    let ftp;
    try {
        ftp = new PromiseFtp();
        await ftp.connect({host: host, user: user, password: password});
        return await ftp.list(path);
    } catch (e) {
        return e.message;
    } finally {
        if (ftp)
            ftp.end();
    }
}

// console.log(listDir('/'));
// listDir('/lower');

// setInterval(listDir.bind(null, '/'), 3600000); // Check once an hour
// setInterval(listDir.bind(null, '/'), 2000);

async function downloadFile(pathToFile) {
    let fileName = pathToFile.split("/").pop();
    // let pathToSavedFile = `./models/ftp/${fileName}`;
    let pathToSavedFile = path.join(__dirname.slice(0, __dirname.indexOf("Daplex") + 6), `models/ftp/${fileName}`)

    let ftp;
    try {
        ftp = new PromiseFtp();
        await ftp.connect({host: host, user: user, password: password});
        let stream = await ftp.get(pathToFile);
        await new Promise(function (resolve, reject) {
            stream.once('close', resolve);
            stream.once('error', reject);
            stream.pipe(fs.createWriteStream(pathToSavedFile));
        });
        return pathToSavedFile;
    } catch (e) {
        throw e;
    } finally {
        if (ftp)
            ftp.end();
    }
}

// downloadFile('lower/bar.txt');
// downloadFile('foo.txt');

async function uploadFile() {
    let ftp;
    try {
        ftp = new PromiseFtp();
        await ftp.connect({host: host, user: user, password: password});
        await ftp.put('bar.txt', 'bar.remote-copy.txt');
    } catch (e) {
        throw e;
    } finally {
        if (ftp)
            ftp.end();
    }
}

// uploadFile();

exports.listDir = listDir;
exports.downloadFile = downloadFile;
exports.uploadFile = uploadFile;
