require("dotenv").config();

const express= require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 8000;
const Blog = require("./models/blog");

const userRoute  = require('./routes/user');
const blogRoute = require("./routes/blog");

const checkForAuthenticationCookie = require('./middlewares/authentication');


// Set strictQuery option
mongoose.set('strictQuery', true); // or false, depending on your preference

//mongodb://localhost:27017/blogify
mongoose
    .connect(process.env.MONGO_URL)
    .then((e) => {
        console.log("Connected to the database");
    })


app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));//it is used to handle form data 
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'));

app.use(express.static(path.resolve("./public")));



/*app.get('/', (req, res) => {
    res.render("home",{
      user: req.user,
      blogs: allBlogs,
    });
  })
*/
app.get('/', async (req, res) => {
  try {
      const allBlogs = await Blog.find(); // Fetch all blogs from the database
      res.render("home", {
          user: req.user,
          blogs: allBlogs,
      });
  } catch (error) {
      res.status(500).send('Server Error');
  }
});
app.use('/user',userRoute);
app.use("/blog", blogRoute);  
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })