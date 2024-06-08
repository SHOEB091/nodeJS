const express = require('express');

const router = express.Router();

router.get('/users',async (req,res)=>{
   
   const allDbUsers = await User.find({});
    const html = `
    <ul>
        ${allDbUsers.map(user=> `<li>${user.first_name} - ${user.email}</li>`).join("")}
    </ul>
    `;
    res.send(html);

})



//REST API
router.get('/api/users',async(req,res)=>{
    //return res.json(users);
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
})

router.get('/api/users/:id',async (req,res)=>{
    //here id = string convert it to number
    const user = await User.findById(req.params.id);

    if(!user) return res.status(404).json({error:"user not found"});
    return res.json(user);
})

router.post("/api/users",async(req,res)=>{
    
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
    
});

router.patch("/api/users/:id",async(req,res)=>{
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

});

router.delete("/api/users/:id",async(req,res)=>{
    
    await User.findByIdAndDelete(req.params.id);
    return res.json({status:"success"});
});




router.listen(PORT,()=>{
    console.log(`Server Started at Port: ${PORT}`);
})
