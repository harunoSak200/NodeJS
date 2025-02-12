const fs = require('fs');


// asynchronous call : 
fs.readFile('./test_files/testfile1.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    console.log(data);
});


// synchronous call : 
const data = fs.readFileSync('./test_files/testfile1.txt', 'utf8');
console.log(data);

// synchronous writing into the file :
fs.writeFileSync('./test_files/output.txt', 'Hello, this is written synchronously in the large size and is highly inefficient.');
console.log('File written successfully.');

fs.writeFile('./test_files/output1.txt', 'Hello, this is written asynchronously.', (err) => {
    if (err) {
        console.error('Error writing file:', err);
        return;
    }
    console.log('File written successfully.');
});

