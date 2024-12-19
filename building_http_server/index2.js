
const http = require("http") ; 
const url = require('url') ; 
const fs = require('fs') ; 


const myserver = http.createServer((req , res)=>{
   if(req.url == '/favicon.ico')return res.end() ;
   const log = `${Date.now()}: ${req.url} New Req Received\n` ; 
   const myurl = url.parse(req.url , true) ; 
   console.log(myurl) ; 
   
   fs.appendFile('./date.txt' , log , (err , data)=>{
    const message = myurl.pathname ;
    switch(message){
        case  '/' :
            res.end('welcome to the home..') ; 
            break;
        case '/about':
            const username = myurl.query.myname ;
            res.end(`hii ${username}`) ; 
            break;
        case '/careers':
            res.end('This is about the careers in the future...')
            break;
        case '/contacts us':
            res.end('This is about the contacts us in the future...')
            break;
        case '/search':
            const search = myurl.query.search_query
            res.end('Results of the search... '+search) ; 
            break;
        default:
            res.end('404 Not Found....') ;
    }
    
   }) ;
   
}); 

myserver.listen(8000 , ()=>{
    console.log('server running on the http://localhost:8000')
})