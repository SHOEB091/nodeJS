const User = require('../models/user');

async function handleGetAllUsers(req,res){
    try {
        const allDbUsers = await User.find({});
        return res.json(allDbUsers);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

async function getUserById(req,res){
    try {
        const user = await User.findById(req.params.id);
        if(!user) return res.status(404).json({error:"user not found"});
        return res.json(user);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

async function postMethod(req,res){
    const { first_name, last_name, email, gender, job_title } = req.body;
    if(!first_name || !last_name || !email || !gender || !job_title){
        return res.status(400).json({msg:"All fields are required"});
    }
    try {
        const result = await User.create({ first_name, last_name, email, gender, job_title });
        return res.status(201).json({msg:"success", id: result._id});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

async function PatchMethod(req,res){
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ msg: "Error updating user", error: error.message });
    }
}

async function DeleteMethod(req,res){
    try {
        await User.findByIdAndDelete(req.params.id);
        return res.json({status:"success"});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    handleGetAllUsers,
    getUserById,
    postMethod,
    PatchMethod,
    DeleteMethod,
}