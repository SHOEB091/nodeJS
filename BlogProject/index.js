const express= require('express');
const path = require('path');
const app = express();
const port = 8000;


app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));//it is used to handle form data 

app.get('/', (req, res) => {
    res.render("home");
  })
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })