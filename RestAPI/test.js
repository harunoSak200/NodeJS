let  book = {
    "english" : 522 , 
    "math" : 755 , 
    "chemistry": 650 , 
    "physics" : 700
}
console.log(book) ; 

updated_value = {
    "math" : 9663 , 
    "physics" : 1002
}

book = {...book , ...updated_value} ; 
console.log(book) ; 