
// reading the file synchronously : 

const fs = require('fs');

const utfdata = fs.readFileSync('./test_files/testfile1.txt', 'utf8');
const imgdata = fs.readFileSync('./images/im.jpg', 'hex');
const hexdata = fs.readFileSync('./test_files/testfile1.txt', 'hex');
const bufferdata = fs.readFileSync('./test_files/testfile1.txt');
console.log(imgdata);
console.log(utfdata) ; 
console.log(hexdata);
console.log(bufferdata.toString('hex')) ;
console.log(bufferdata.toString('ascii')) ;
console.log(bufferdata.toString('base64')) ;



