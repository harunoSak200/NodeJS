
// synchronous way of writing into the file .. 
const fs = require("fs")
fs.writeFileSync('./file_handling/test.txt' , 'hello there!')

// doing this will override the file with the new sentences  if file alreadyy exists otherwise it gonna crete new file
fs.writeFileSync('./file_handling/test.txt' , 'cat the baket!')


// asynchronous writing into the file :
fs.writeFile("./file_handling/test1.txt" , "new file is created ...." , (err)=>{
    console.log('file is created')
});

const result = fs.readFileSync('./file_handling/test.txt' , 'utf-8')
console.log(result) ; 


// readfile async  :  It doesn't return anything .
fs.readFile('./file_handling/test.txt' , 'utf-8' , (err , result)=>{
    if(err){
        console.log("error" , err) ;
    }
    else{
        console.log(result) ;
    }
});






