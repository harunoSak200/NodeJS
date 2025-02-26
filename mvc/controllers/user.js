const User = require('../models/user') ; 

async function  handleGetAllUsers(req , res){
    const userFromDB = await User.find({}) ; 
    res.status(200).send(userFromDB) ;
}

async function  handleGetUserById(req , res){

    if((req.params.id).length!=24){
        return res.status(400).json({
            "user_id-error" : "id given not contains 24 charcters , by default mongodb generates id of the 24 characters"
        })
    }

    const user = await User.findById(req.params.id) ;
    if(!user) return res.status(404).json({"msg":"user not found."}) ; 
    
    return res.json(user) ; 
}
async function handleUpdateUserById(req , res){

    if((req.params.id).length!=24){
        return res.status(400).json({
            "user_id-error" : "id given not contains 24 charcters , by default mongodb generates id of the 24 characters"
        })
    }

    const body = req.body ;
    await User.findByIdAndUpdate(req.params.id , {lastName:body.last_name , firstName:body.first_name , email:body.email}) ; 
    res.status(200).json({"msg":"success"}) ; 
}
async function handleDeleteUserById(req , res){
    if((req.params.id).length!=24){
        return res.status(400).json({
            "user_id-error" : "id given not contains 24 charcters , by default mongodb generates id of the 24 characters"
        })
    }

    await User.findByIdAndDelete(req.params.id)
    res.status(200).json({"msg":"success"}) ; 
}

async function handleCreateNewUser(req , res){
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
}


async function handleGetUserLIST(req ,res){
    const userFromDB = await User.find({}) ; 
          const html = `
            <ul>
                ${userFromDB.map((user) => `<li>${user.firstName}-${user.email}</li>`).join('')}     
            </ul>
          `;
    res.send(html);
}




module.exports = {
     handleGetAllUsers , 
     handleGetUserById ,
     handleUpdateUserById , 
     handleDeleteUserById , 
     handleCreateNewUser , 
     handleGetUserLIST
}