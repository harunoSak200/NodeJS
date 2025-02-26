const express = require('express')
const users = require("./Data_files/MOCK_DATA.json")
const mongoose = require('mongoose') ;

const fs = require('fs')
const url = require('url') ;


const app = express()
const port = 3000

// connection : 
mongoose.connect('mongodb://127.0.0.1:27017/test-db-0')
.then(()=>console.log('mongodb connected...'))
.catch((err)=>console.log('mongo db error ...')) ; 


// schemma: 
const userSchemma = new mongoose.Schema({
    firstName: {
        type : String , 
        required:true , 
    } , 
    lastName : {
        type : String , 
        required : false ,
    } , 
    email:{
        type : String , 
        required : true , 
        unique : true , 
    } , 
    jobTitle : {
        type : String , 
    } ,
    gender : {
        type : String , 
    }
} , {timestamps : true})  ; 


// creation of the model name 'user'
const User = mongoose.model('user' , userSchemma)




app.use(express.urlencoded({extended:false})) ;  
app.use(express.json()) ; 
 
app.use((req , res , next)=>{
    const now = new Date();
    

    fs.appendFile('./logs/log1.txt' , `${req.url}        ${req.method}        ${now.toLocaleString()}\n` , (err , data)=>{
        if(err){
            res.send('error end points cannot be hit either due the incomplete information or the cyber threat...')
        }
        next() ; 
    })
})



app.use((req , res , next)=>{
    console.log('hello from the middleware 1...') ; 
    next() ; 
})

app.use((req , res , next)=>{
    req.my_user_name = "aditya kshatriya"
    console.log('hello from the middleware 2...') ;
    next() ; 
})
app.use((req , res , next)=>{
    console.log(`username is the ${req.my_user_name}`)
    next() ; 
})





app.get('/users', async(req, res) => {
const userFromDB = await User.find({}) ; 
  const html = `
    <ul>
        ${userFromDB.map((user) => `<li>${user.firstName}-${user.email}</li>`).join('')}     
    </ul>
  `;
  res.send(html);
})

app.get('/api/users' , async(req , res)=>{    // custom middlewares
    const userFromDB = await User.find({}) ; 
    res.status(200).send(userFromDB) ;
    
})
app.get('/api/users-info/:id' , async(req , res)=>{       
    
    const user = await User.findById(req.params.id) ;
    if(!user) return res.status(404).json({"msg":"user not found."}) ; 
    return res.json(user) ; 
});

app
    .route("/api/users/:id")

    .patch(async(req, res)=>{
        const body = req.body ;
        await User.findByIdAndUpdate(req.params.id , {lastName:body.last_name , firstName:body.first_name , email:body.email}) ; 
        res.status(200).json({"msg":"success"}) ; 
    
    })
    .delete(async(req , res)=>{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({"msg":"success"}) ; 
        
    })
    
    
app.post('/api/users' , async(req , res)=>{
        const body = req.body ; 
    if(
        !body || 
        !body.first_name ||
        !body.last_name||
        !body.email||
        !body.gender||
        !body.job_title
    ){
        return res.status(400).json({
            msg:"all the fields are required.."
        })
    }
    const result = await User.create({
        firstName : body.first_name , 
        lastName:body.last_name , 
        email:body.email , 
        gender : body.gender , 
        jobTitle  : body.job_title
    }) ; 

    return res.status(202).json({msg:"success" , 
        "result" : result
    })

});
    
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})




