const express = require("express") ; 
const path = require('path') ; 
const app = express() ; 
const PORT = 8001 ; 

const staticRoute = require('./routes/staticRouter')
 
app.use(express.json()) ; 
app.use(express.urlencoded({extended:false})) ; // this is used to parse the form data
const {connectToMongoDB} = require('./connection') ; 
const urlRoute  = require('./routes/url') ; 

const URL = require('./models/url') ; 

// Connection: 

connectToMongoDB('mongodb://127.0.0.1:27017/url-shortner')
.then(()=>console.log('mongodb connected')) ; 


app.set('view engine' , "ejs");
app.set('views' , path.resolve('./views')) ; 

app.use('/' , staticRoute) ; 


app.use('/url' , urlRoute) ; 


app.get('/test' , async(req , res)=>{
    const allurls = await URL.find({}) ;
    res.render('home'  ,  {
        urls : allurls 
    }) 
}) ; 

app.get('/allurls' , async(req , res)=>{
    const allurls = await URL.find({}) ;
    return res.end(`
        
            <html>
            <head></head>
            <body>
                ${allurls.map(url => `<li>${url.shortId}) - ${url.redirectUrl} - ${url.visitHistory.length}</li>`).join('')}
            </body>
            </html>

        
        `)

});

app.get('/url/:shortId' , async(req , res)=>{
    const shortId = req.params.shortId ;
    const entry = await URL.findOneAndUpdate({
        shortId
    } ,{$push : {

        visitHistory : 
        [
            {timestamp : Date.now() }
        ]
          
    }} )

    res.redirect(entry.redirectUrl) ;
    
})

app.listen(PORT , ()=>console.log(`server running at the http://localhost:${PORT}`)) ;
