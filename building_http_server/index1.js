

const http = require("http") ; 

const fs = require('fs') ; 


const myserver = http.createServer((req , res)=>{
   const log = `${Date.now()}: ${req.url} New Req Received\n` ; 
   fs.appendFile('./date.txt' , log , (err , data)=>{
    const message = req.url ;
    switch(message){
        case  '/' :
            res.end('welcome to the home..') ; 
            break;
        case '/about':
            res.end('This is basic https server..')
            break;
        case '/careers':
            res.end('This is about the careers in the future...')
            break;
        case '/contacts us':
            res.end('This is about the contacts us in the future...')
            break;
        case '/Links':
            res.end('This is about the links in the future...')
            break;
        default:
            res.end('404 Not Found....') ;

    }
    
   }) ;
   
}); 


myserver.listen(8000 , ()=>{
    console.log('server running on the http://localhost:8000')
})