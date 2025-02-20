// const fs = require('fs');


// asynchronous call : 
// fs.readFile('./test_files/testfile1.txt', 'utf8', (err, data) => {
//     if (err) {
//         console.error('Error reading file:', err);
//         return;
//     }
//     console.log(data);
// });


// // synchronous call : 
// const data = fs.readFileSync('./test_files/testfile1.txt', 'utf8');
// console.log(data);

// // synchronous writing into the file :
// fs.writeFileSync('./test_files/output.txt', 'Hello, this is written synchronously in the large size and is highly inefficient.');
// console.log('File written successfully.');

// fs.writeFile('./test_files/output1.txt', 'Hello, this is written asynchronously.', (err) => {
//     if (err) {
//         console.error('Error writing file:', err);
//         return;
//     }
//     console.log('File written successfully.');
// });



// synchronous appending in the file : 

// fs.appendFileSync('./test_files/output.txt', '\nAppending new content...');
// console.log('Data appended successfully.');

// // asynchronus appending in the file : 

// fs.appendFile('./test_files/output.txt', '\nAppending asynchronously...', (err) => {
//     if (err) {
//         console.error('Error appending file:', err);
//         return;
//     }
//     console.log('Data appended successfully.');
// });


// deletion of the file : 

// synchronous deletion : 
// fs.unlinkSync('./test_files/output.txt') ;

// asynchronous deletion :

// fs.unlink('./test_files/output.txt', (err) => {
//     if (err) {
//         console.error('Error deleting file:', err);
//         return;
//     }
//     console.log('File deleted successfully.');
// });


// if (fs.existsSync('./test_files/output1.txt')) {
//     console.log('File exists.');
// } else {
//     console.log('File does not exist.');
// }



// fs.access('./test_files/output1.txt', fs.constants.F_OK, (err) => {
//     if (err) {
//         console.log('File does not exist.');
//     } else {
//         console.log('File exists.');
//     }
// });


// access() using the promises :
// const fs = require('fs').promises;

// // fs.access('./test_files/output1.txt', fs.constants.F_OK)
// //     .then(() => console.log('File exists.'))
// //     .catch(() => console.log('File does not exist.'));


// // access() using the async-await :


// async function checkFile() {
//     try {
//         await fs.access('./test_files/output1.txt', fs.constants.F_OK);
//         console.log('File exists.');
//     } catch {
//         console.log('File does not exist.');
//     }
// }

// checkFile();



// renaming the file synchronously : 
const fs = require('fs') ; 

// fs.renameSync('./test_files/newnamedfile.txt', 'abctestfile.txt');
// console.log('File renamed successfully.');


// renaming the file asynchronously : 

// fs.rename('./test_files/newName.txt', './test_files/newName.txt', (err) => {
//     if (err) {
//         console.error('Error renaming file:', err);
//         return;
//     }
//     console.log('File renamed successfully.');
// });



// creation of the directory synchronously : 

// fs.mkdirSync('./test_directory/testFolder2');
// console.log('Directory created successfully.');



// code to create multiple nested folder at once


// let parent = "./test_directory";
// let location = "" ;
// for(let i = 0 ; i < 500 ; i++){
    
//     location = location + `/testFolder${i}` ;
//     fs.mkdirSync(parent+location);
//     console.log('multiple nested directory succesfully created..........') ;
// }



// deleting the directory : 
// fs.rmdirSync('test_directory');
// console.log('Directory removed successfully.');




// synchronously deletion of the non-empty directory.
// fs.rmSync('test_directory', { recursive: true, force: true });
// console.log('Directory removed successfully.');

// //asynchronously deletion of the empty directory.
// fs.rm('test_directory', { recursive: true, force: true }, (err) => {
//     if (err) {
//         console.error('Error:', err.message);
//     } else {
//         console.log('Directory removed successfully.');
//     }
// });



// to list the file : 
// fs.readdir('test_directory', (err, files) => {
//     if (err) {
//         console.error('Error reading directory:', err);
//         return;
//     }
//     console.log('files: ' , files)

// });


// fs.watch('./test_directory/main.cpp', (eventType, filename) => {
//     console.log(`File ${filename} was modified. Event type: ${eventType}`);
// });


/*refer this link of the chatgpt to get more about the file handling:

https://chatgpt.com/share/67adf048-a4dc-800f-b0cc-f8c2d262ba6d




*/


const os = require('os');
console.log(os.cpus().length) ; 
console.log(os.cpus()) ; 















