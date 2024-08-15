const express= require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const port = 8000;
const userRoute  = require('./routes/user')

mongoose
    .connect('mongodb://localhost:27017/blogify')
    .then((e) => {
        console.log("Connected to the database");
    })


app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));//it is used to handle form data 

app.get('/', (req, res) => {
    res.render("home");
  })
app.use('/user',userRoute);
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })