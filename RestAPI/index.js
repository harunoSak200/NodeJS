// creation of the hybrid server:

const express = require('express')
const users = require("./Data_files/MOCK_DATA.json")
const fs = require('fs')


const app = express()
const port = 3000

app.use(express.json()) // middleware

app.get('/users', (req, res) => {
  const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join('')} 
    </ul>
  `;

  res.send(html);
})
app.get('/api/users' , (req , res)=>{ 
    return res.json(users) ;
    
})
app.get('/api/users-info/:id' , (req , res)=>{
    
    const user_id = Number(req.params.id) ; 
    if(user_id > users.length){
        res.send(`Only the ${users.length} exists in the database... sorry`);
    }

    else {
        
        for(let i = 0 ;i < users.length ; i++){
            
                if(users[i].id == user_id){
                    res.send(users[i]) ;
                }
            }
        }
        
        
        
        
        
});

app
    .route("/api/users/:id")

    .patch((req, res)=>{
        // console.log(req.params) --> params for the parameter
        const id_value = Number(req.params.id);

        const data = req.body 
        console.log(data) ; 

        for(let i = 0 ; i < users.length ; i++){
            if(users[i].id == id_value){
                users[i] = {...users[i] , ...data} // used to replace the certain selected content only .
                fs.writeFile('./Data_files/MOCK_DATA.json' , JSON.stringify(users) , (err , data)=>{
                    if(err){
                        return res.send(err)
                    }
                    else{
                        res.send(`successfully updated the value for the ${users[i].id}`)
                    }
                })


                
            }
        }
    })
    .delete((req , res)=>{
        const id_value = Number(req.params.id) ; 
        users.splice(id_value-1, 1); // used to delete the element from the list.

        fs.writeFile('./Data_files/MOCK_DATA.json' , JSON.stringify(users) , (err , data)=>{
            if(err){
                res.send('error')
            }
            else{
                res.send(`successfully deleted the element with the id value ${id_value}`);
            }
        })
        
        
    })
    
    
    app.post('/api/users' , (req , res)=>{

        const data = req.body  
        data.id = Number(data.id) ; 
        data.id = users.length+1 ;
        users.push(data) ; 

        
        const id_number = data.id ; 

        fs.writeFile('./Data_files/MOCK_DATA.json' , JSON.stringify(users) , (err , data)=>{
            return res.json({
                "status" : "sucess" , 
                 "id" : id_number
            }) ;
        })


    })
    
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})






    // note : 
    //return res.json(users) ; or 
    // res.send(users) ; or
    // res.json(users) ;  
    
    // all results in the same output




    /* 
    
    

        since the routes for all the request are the same , so we can merge it together
        to make the code mode simpler and smaller .


        app.post('/api/users' ,(req , res)=>{
            res.json({status : 'pending'});
        })


        app.patch('/api/users/:id' , (req, res)=>{
            return res.json({status:'pending'}) ; 
        })


        app.put('/api/users/:id' , (req, res)=>{
            return res.json({status:'pending'}) ; 
        })

        app.delete('/api/users/:id' , (req , res)=>{
            return res.json({status : 'pending'}) ; 
        })
    


        <<<<<-----:by doing this : chaining:-->>>>>>>


app
    .route("/api/users/:id")

    .post((req , res)=>{
        res.json({status : 'pending'});
    })
    .patch((req, res)=>{
        return res.json({status:'pending'}) ; 
    })
    .put((req, res)=>{
        return res.json({status:'pending'}) ; 
    })
    .delete((req , res)=>{
        return res.json({status : 'pending'}) ; 
    })

    
    
    
    
    
    
    
    
    
    */