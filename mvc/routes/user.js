const express = require('express'); 
const { handleGetAllUsers, handleGetUserById, handleUpdateUserById, handleDeleteUserById, handleCreateNewUser, handleGetUserLIST } = require('../controllers/user');
const router = express.Router() ; 
   
    router.get('/list', handleGetUserLIST)
    
    router
        .route('/')
        .get(handleGetAllUsers) 
        .post(handleCreateNewUser)

    
    router
        .route("/:id")
        .patch(handleUpdateUserById)
        .delete(handleDeleteUserById)
        .get(handleGetUserById)
        
        
    
    module.exports = router
    

    