const PromiseFtp = require('promise-ftp');
const fs = require('fs');

let host = "localhost";
let user = "ftpUser";
let password = "ftppw";

async function listDir() {
    
    var res = ["intet at sende tilbage","desværre"];
    var ftp = new PromiseFtp();
    await ftp.connect({host: host, user: user, password: password})
    .then(serverMessage =>{
        console.log(`Server Message: ${serverMessage}`);
        return ftp.list('/');
    }).then(list => {
        res = list;
        return ftp.end();
    });

    return res;
}

// listDir('/');
// listDir('/lower');

// setInterval(listDir.bind(null, '/'), 3600000); // Check once an hour
// setInterval(listDir.bind(null, '/'), 2000);

async function downloadFile() {
    let ftp;
    try {
        ftp = new PromiseFtp();
        await ftp.connect({host: host, user: user, password: password});
        let stream = await ftp.get('foo.txt');
        await new Promise(function (resolve, reject) {
            stream.once('close', resolve);
            stream.once('error', reject);
            stream.pipe(fs.createWriteStream('./temp/foo.local-copy.txt'));
        });
    } catch (e) {
        throw e;
    } finally {
        if (ftp)
            ftp.end();
    }
}

// downloadFile();

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