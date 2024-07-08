const path = require("path");
const express = require("express");
const multer = require('multer');
const app = express();
const PORT = 8000;

const upload = multer({dest:"uploads/"});


app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));//it is used to handle form data 

app.get("/",(req,res)=>{
    return res.render("homepage");
});
app.post("/upload",upload.single("ProfileImage"),(req,res)=>{
    console.log(req.body);
    console.log(req.file);


    return res.redirect("/");
});

app.listen(PORT,()=>console.log(`Server Started at PORT:8000`))