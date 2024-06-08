const express = require('express');

const fs = require('fs');

//const users = require("./MOCK_DATA.json")

const User = require("./mongodbConnection");


const app = express();

//Middleware - Plugin
app.use(express.urlencoded({extended:false}));
app.use(express.json());//to parse JSON bodies 

const PORT = 8000;

// const mongoose = require('mongoose');

//Connection With mongoose
// mongoose.connect("mongodb://127.0.0.1:27017/My-first-dbs")
// .then(()=>{
//     console.log("MongoDB Connected");
// })
// .catch((err)=>{
//     console.log("Mongo Error", err);
// })

// //Schema 
// const userSchema = new mongoose.Schema({
//     firstName: {
//         type: String,
//         required:true,
//     },
//     lastName:{
//         type: String,
//     },
//     email: {
//         type: String,
//         required:true,
//         unique:true,
//     },
//     jobTitle:{
//         type:String,
//     },
//     gender:{
//         type:String,
//     }
// })

// const User = mongoose.model('user',userSchema);



app.get('/users',async (req,res)=>{
    /*
    <ul>
    <l1>Piyush</li>
    */
   const allDbUsers = await User.find({});
    const html = `
    <ul>
        ${allDbUsers.map(user=> `<li>${user.first_name} - ${user.email}</li>`).join("")}
    </ul>
    `;
    res.send(html);

})

//ROUTES;

//REST API
app.get('/api/users',async(req,res)=>{
    //return res.json(users);
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
})

//short method 

/*app.route("/api/users/:id")
.get((req,res)=>{
    //here id = string convert it to number
    const id = Number(req.params.id);
    const user = users.find((user)=> user.id == id);
    return res.json(user);
})
.patch((req,res)=>{
    //Edit user with id 
    return res.json({status:"Pending"});
})
.delete((req,res)=>{
    //Delete user with id
    return res.json({status :"Pending"});
})*/


app.get('/api/users/:id',async (req,res)=>{
    //here id = string convert it to number
    const user = await User.findById(req.params.id);

    if(!user) return res.status(404).json({error:"user not found"});
    //const id = Number(req.params.id);
    //const user = users.find((user)=> user.id == id);
    return res.json(user);
})

app.post("/api/users",async(req,res)=>{
    //express does not know that which type of data this is for this we have to use middleware 
    const body = req.body;
    if(
        !body || !body.first_name || 
        !body.last_name || !body.email || !body.gender || !body.job_title
    ){
        return res.status(400).json({msg:"All fields are req..."});
    }
    const result = await User.create({
        first_name:body.first_name,
        last_name:body.last_name,
        email:body.email,
        gender:body.gender,
        job_title: body.job_title,

    })

    //console.log("result",result);

    return res.status(201).json({msg:"success"})

    /*users.push({...body,id:users.length+1});
    fs.writeFile("./MOCk_DATA.json",JSON.stringify(users),(err,data)=>{
        return res.status(201).json({status:"success",id: users.length});
    })*/
    
});

app.patch("/api/users/:id",async(req,res)=>{
    //ToDo: edit the user with id 

    try {
        //fething data from body 
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ msg: "Error updating user", error: error.message });
    }

    /*const id = parseInt(req.params.id);

    const userIndex= users.findIndex(user => user.id === id);

    if(userIndex === -1){
        return res.status(404).json({status:"error",message :"User not Found"});
    }

    //update the user details with the data from request body

    users[userIndex]={...users[userIndex],...req.body};

    //Write the updated users array back to the file
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
        if(err)
            {
                return res.status(500).json({status: "error", message: "Failed to update user"});
            }
    })

    return res.json({status:"success",user: users[userIndex]});*/
});

app.delete("/api/users/:id",async(req,res)=>{
    //Todo: Delete the user with Id 
    // Get the id from the request parameters
    /*const id = parseInt(req.params.id);

    // Find the index of the user in the users array
    const userIndex = users.findIndex(user => user.id === id);

    // If the user was not found, return an error
    if (userIndex === -1) {
        return res.status(404).json({status: "error", message: "User not found"});
    }

    // Remove the user from the users array
    users.splice(userIndex, 1);

    // Write the updated users array back to the file
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
        if (err) {
            // If there was an error writing to the file, send an error status
            return res.status(500).json({status: "error", message: "Failed to delete user"});
        }

        // Return a success status
        return res.json({status: "success", message: "User deleted successfully"});
    });*/
    await User.findByIdAndDelete(req.params.id);
    return res.json({status:"success"});
});




app.listen(PORT,()=>{
    console.log(`Server Started at Port: ${PORT}`);
})
