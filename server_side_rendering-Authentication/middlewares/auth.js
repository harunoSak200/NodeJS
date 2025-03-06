const {getUser} = require('../service/auth')
const url = require('url') ; 



async function restrictToLoggedinUserOnly(req , res , next){
    const useruid = req.headers.cookie ; 
    if(!useruid)return res.redirect('/login') ;
    
    const user = getUser(useruid.substring(4)) ; 
   

    if(!user)return res.redirect('/login') ; 
   
    req.user = user ; 
    
    next(); 
} 
async function CheckAuth(req , res , next){
    const useruid = req.headers.cookie ; 
    let user = useruid ; 
    
    if(useruid != undefined){
        user = getUser(useruid.substring(4)) ; 
    }
    req.user = user ; 
    
    next(); 
}

module.exports = {
    restrictToLoggedinUserOnly , 
    CheckAuth , 
}