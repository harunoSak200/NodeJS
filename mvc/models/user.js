const {mongoose} = require("mongoose");


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


module.exports = User ; 