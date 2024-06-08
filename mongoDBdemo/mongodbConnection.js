const mongoose = require('mongoose');

//Connection With mongoose
mongoose.connect("mongodb://127.0.0.1:27017/My-first-dbs")
.then(()=>{
    console.log("MongoDB Connected");
})
.catch((err)=>{
    console.log("Mongo Error", err);
})

//Schema 
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required:true,
    },
    last_name:{
        type: String,
    },
    email: {
        type: String,
        required:true,
        unique:true,
    },
    gender:{
        type:String,
    },
    job_title:{
        type:String,
    },
},
    {timestamps:true}
);

const User = mongoose.model('user',userSchema);
module.exports=User;