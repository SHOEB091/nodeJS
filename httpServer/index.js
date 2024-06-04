const http = require('http');

//const fs = require('fs');

//const url = require('url');

const express = require('express');

const app = express();

app.get('/',(req,res)=>{
    return response.send('Hello from home page');
})
app.get('/about',(req,res)=>{
    return response.send('Hello from about page');
})

function myhandler(req,res){

    if(req.url === "/favicon.ico") return res.end();

    //console.log("New Req Rec. ");
    //console.log(req);

    //const log = `${Date.now()}: new Req Recieved\n`;

    const myUrl = url.parse(req.url,true);
    console.log(myUrl);

    const log = `${Date.now()}: ${req.method} ${req.url} New Req Recieved\n`;

    fs.appendFile('log.txt',log,(err,data)=>{

        //multi ROUTE
        switch(req.url){

            case '/': res.end("HomePage");
            break;

            case '/about': 
            const qp = 
            res.end("I am Shoeb Iqbal ")
            break;

            case '/search':
                const search = myUrl.query.search_query;
                res.end("Here are your results for" +search);

             case "/signup":
                if(req.method === "GET") res.end ("This is a signup Form ");
                else if(req.method === "POST"){
                    //DB Query
                    res.end("Success");
                }   

            default:
                res.end("404");
        }

        //res.end("Hello From Server");
    })

    //res.end("Hello From Server")
}

const myServer = http.createServer(app);


myServer.listen(8000,()=>{
    console.log("server Running!");
});




