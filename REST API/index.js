const express = require('express');

const fs = require('fs');

const users = require("./MOCK_DATA.json")

const app = express();

//Middleware - Plugin
app.use(express.urlencoded({extended:false}));
app.use(express.json());//to parse JSON bodies 


const PORT = 8000;

app.get('/users',(req,res)=>{
    /*
    <ul>
    <l1>Piyush</li>
    */

    const html = `
    <ul>
        ${users.map(user=> `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);

})

//ROUTES;

//REST API
app.get('/api/users',(req,res)=>{
    return res.json(users);
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


app.get('/api/users/:id',(req,res)=>{
    //here id = string convert it to number
    const id = Number(req.params.id);
    const user = users.find((user)=> user.id == id);
    return res.json(user);
})

app.post("/api/users",(req,res)=>{
    //express does not know that which type of data this is for this we have to use middleware 
    const body = req.body;
    users.push({...body,id:users.length+1});
    fs.writeFile("./MOCk_DATA.json",JSON.stringify(users),(err,data)=>{
        return res.json({status:"success",id: users.length});
    })
    
});

app.patch("/api/users/:id",(req,res)=>{
    //ToDo: edit the user with id 
    const id = parseInt(req.params.id);

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

    return res.json({status:"success",user: users[userIndex]});
});

app.delete("/api/users/:id",(req,res)=>{
    //Todo: Delete the user with Id 
    // Get the id from the request parameters
    const id = parseInt(req.params.id);

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
    });
});




app.listen(PORT,()=>{
    console.log(`Server Started at Port: ${PORT}`);
})
