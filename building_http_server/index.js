const http = require("http")  // http package helps us to make our own server


const myserver = http.createServer((req , res)=>{
    console.log(req.headers) ;
    console.log('new request from client') ;
    res.end('hello form the server') ;
}); 


myserver.listen(8000 , ()=>{
    console.log('server running on the http://localhost:8000')
});