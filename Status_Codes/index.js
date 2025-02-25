// middlewares:


const express = require('express')
const users = require("./Data_files/MOCK_DATA.json")
const fs = require('fs')
const url = require('url') ;


const app = express()
const port = 3000

app.use(express.urlencoded({extended:false})) ;  // study about it..
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


// app.use(express.json()) // middleware plugin for the accesing the body...


app.use((req , res , next)=>{
    console.log('hello from the middleware 1...') ; 
    next() ; 
})

// app.use((req , res , next)=>{
//     req.my_user_name = "aditya kshatriya"
//     console.log('hello from the middleware 2...') ;
//     next() ; 
// })
// app.use((req , res , next)=>{
//     console.log(`username is the ${req.my_user_name}`)
//     next() ; 
// })





app.get('/users', (req, res) => {
  
  const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join('')}     
    </ul>
  `;
  res.send(html);
})

app.get('/api/users' , (req , res)=>{    // custom middlewares
    res.setHeader("X-my_name" , "aditya") ;    // creating a response header and this allows us to add only one head at time


    
    const  headers = new Headers({    // setting up multiple headers at the single time
        'X-fav_Num':4562 , 
        'X-first_name' : 'aditya' , 
        'X-last_name':'kshatriya' , 
        'X-email':'abc@gmail.com' ,
        'X-my_name' : 'rahul'
   });

   //note:  setting same header multiple time replace the already existing header value with the new header
   // NOTE : it is good practice to insert the x infront of the headers it ensures that the header just I have created is not a built-in header instead it is custom header


  // setting up the req headers  : 
  console.log('request headers : ' , req.headers)
 

   res.setHeaders(headers) ; 

    console.log(`I am in the api/users username is ${req.my_user_name}`)
    return res.json(users) ;
    
})
app.get('/api/users-info/:id' , (req , res)=>{       
    
    const user_id = Number(req.params.id) ; 
    if(user_id > users.length){
        res.send(`Only the ${users.length} not exists in the database... sorry`);
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
        
        const id_value = Number(req.params.id);

        const data = req.body 
        console.log(data) ; 

        for(let i = 0 ; i < users.length ; i++){
            if(users[i].id == id_value)
                {
                users[i] = {...users[i] , ...data} 
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

        const index = users.findIndex(user => user.id === id_value);
        users.splice(index, 1);   

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
        const data = req.body ; 


        let temp = {} ; 
        temp = {"id":users.length+1 , ...data}
        users.push(temp) ; 
        


        fs.writeFile('./Data_files/MOCK_DATA.json' , JSON.stringify(users) , (err , data)=>{                
            return res.status(201).json({
                "status" : "success" , 
                 "id" : temp.id
            }) ;
        })


    })
    
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})






