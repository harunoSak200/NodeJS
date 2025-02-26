const express = require('express')
const userRouter = require('./routes/user')
const {connectMongoDB} = require('./connection')
const {logs, logFile} = require('./middlewares')




const app = express()
const port = 3000

// connection : 
connectMongoDB('mongodb://127.0.0.1:27017/test-db-0')
.then(()=>console.log('mongodb connected...'))
.catch((err)=>console.log('mongo db error ...')) ; 




//middleware -plugin
// app.use(express.urlencoded({extended:false})) ;  
app.use(express.json()) ; 


// middleware generate the method logs : 


//custom middleware
app.use(logFile('./logs/log.txt')) ; 

// Routes
app.use('/user' , userRouter) ; 




    
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})




