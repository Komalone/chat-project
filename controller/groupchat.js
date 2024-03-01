const User= require('../models/user');

exports.getAllUser=async (req,res)=>{
    try{
        const groupUser=await User.findAll()   
        res.status(200).json({ allUser: groupUser});                     

    }
    catch(err){
        res.status(500).json({message:err,success:false})
    }
}