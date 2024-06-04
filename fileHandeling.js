const fs = require('fs');


//WRITE FILE

//Synchronous call
//fs.writeFileSync('./test.txt',"Hey There");


//Async
//fs.writeFile("./test2.txt","Hello World",(err)=>{})

//read file

//blocking 
//const result = fs.readFileSync('./contact.txt','utf-8');
//console.log(result);


//non blocking 
fs.readFile('./contact.txt','utf-8',(err,result)=>{
    if(err){
        console.log("Error",err);
    }
    else{
        console.log(result);
    }
})

//append

fs.appendFileSync("test.txt",' Hey There \n');