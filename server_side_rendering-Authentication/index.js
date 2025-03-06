const express = require("express") ; 
const path = require('path') ; 
const URL = require('./models/url') ; 
const cookieParser = require('cookie-parser') ;
const {restrictToLoggedinUserOnly , CheckAuth} = require('./middlewares/auth')

const app = express() ; 
const PORT = 8001 ; 


app.use(cookieParser()) ; 
app.use(express.json()) ; 
app.use(express.urlencoded({extended:false})) ; // this is used to parse the form data


const {connectToMongoDB} = require('./connection') ; 


const urlRoute  = require('./routes/url') ; 
const staticRoute = require('./routes/staticRouter')
const userRoute = require('./routes/user')


// Connection: 

connectToMongoDB('mongodb://127.0.0.1:27017/url-shortner')
.then(()=>console.log('mongodb co nnected')) ; 


app.set('view engine' , "ejs");
app.set('views' , path.resolve('./views')) ; 



app.use('/url' ,restrictToLoggedinUserOnly, urlRoute) ; 
app.use('/' , CheckAuth , staticRoute) ; 
app.use('/user' , userRoute) ; 




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
