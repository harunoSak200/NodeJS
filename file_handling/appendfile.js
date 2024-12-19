
// append file synchronously...
const fs = require('fs') ; 
fs.appendFileSync('./NodeJs/file_handling/test.txt' , '\nThis is the sentence...') ;


// append file asynchronously...
// fs.appendFile('./NodeJs/file_handling/test.txt' , '\nThis is the sentence...')


/*
Refer this link to get information about the threads exceution and the node.js architecture
https://chatgpt.com/share/6762e713-ea18-800f-af56-4bcfc214122c

*/

const os = require('os') ; 
console.log(os.cpus().length) ; 

// this will print the info about the each threads machine consist
console.log(os.cpus()) ; 
