const user = require('../models/users') ; 
const {v4:uuidv4} = require('uuid'); 
const {setUser , getUser} = require('../service/auth')

async function handleUserSignup(req , res){
    const {name , email , password} = req.body ; 
    await user.create({
        name , 
        email , 
        password ,
    }) ; 
    return res.redirect('/') ; 
}
async function handleUserLogin(req , res){
    const {email , password} = req.body ; 
    const User = await user.findOne({
        email , 
        password ,
    }) ; 
   

    if(!User){
        return res.render('login' , {
            error : 'Invalid username or password' ,
        } )
    }
    else { 
        const sessionID = uuidv4() ; 
        setUser(sessionID , User) ; 
        // console.log(sessionID , User)
        res.cookie('uid' , sessionID)
        return res.redirect('/');
    }

   
}


module.exports = {
    handleUserSignup , 
    handleUserLogin  , 
}