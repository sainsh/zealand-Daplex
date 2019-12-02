const PromiseFtp = require('promise-ftp');
const fs = require('fs');

let host = "localhost";
let user = "testuser";
let password = "testpw";

async function listDir(path) {
    let ftp;
    try {
        ftp = new PromiseFtp();
        await ftp.connect({host: host, user: user, password: password});
        let res = await ftp.list(path);
        console.log(res);
        ftp.end();
    } catch (e) {
        throw e;
    } finally {
        if (ftp)
            ftp.end();
    }
}

// listDir('/');
// listDir('/lower');

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