const express = require('express');

const { connectMongoDb } = require('./connection');

const {logReqRes} =require("./middlewares/index");

const userRouter = require("./routes/user")

const app = express();

const PORT = 8000;

//connection 
connectMongoDb("mongodb://127.0.0.1:27017/My-first-dbs").then(()=> console.log("Mongodb Connected")
).catch((err)=>{
    console.log("error",err);
})

//Middleware - Plugin
app.use(express.urlencoded({extended:false}));
app.use(express.json());//to parse JSON bodies 
app.use(logReqRes("log.txt"));

//Routes
app.use("/api/users",userRouter);

app.listen(PORT,()=>{
    console.log(`Server Started at Port: ${PORT}`);
})