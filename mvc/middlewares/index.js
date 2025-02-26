const fs = require('fs')

function logFile(filename){
    return (req , res , next)=>{
        const now = new Date();
            
        
            fs.appendFile(filename , `${req.url}        ${req.method}        ${now.toLocaleString()}\n` , (err , data)=>{
                if(err){
                    res.send('error end points cannot be hit either due the incomplete information or the cyber threat...')
                }
                next() ; 
            })
    }
}

module.exports = {
    logFile , 
}

