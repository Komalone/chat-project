const User= require('../models/user');
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken')


function isstringinvalid(string){
    if(string==undefined || string.length===0){
        return true;
    }
    else{
        return false;
    }
}


exports.userSignup= async(req, res)=>{
    try{
        const name= req.body.name;
        const email= req.body.email;
        const password= req.body.password;
        if( isstringinvalid(name) || isstringinvalid(email) || isstringinvalid(password)){
            res.status(401).json({message: "Something is missing"})
        }

        let saltrounds= 10;
        bcrypt.hash(password, saltrounds, async(err, hash)=>{
            const data= await User.create({
                name: name,
                email: email,
                password: hash
            });
            console.log("user data", data);
            res.status(200).json({message: "user created"})
        })
    }catch(err){
        console.log(err)
        res.status(500).json({error:"some error",err})
    }
};


function generateAccessToken(id, name){
    return jwt.sign({userId: id, name: name}, tokenKK76354igjhf)
}

exports.userLogin= async(req, res)=>{
    try{
        const{email,password}=req.body     

        if(isstringinvalid(email)||isstringinvalid(password)){
            return res.status(400).json({message:'email or id is missing',success:false})
        }

        const user= await User.findOne({where : {email}})
        if(user){
            bcrypt.compare(password, user.password, (err, result)=>{
                if(result){
                    return res.status(200).json({
                        success:true,
                        message:'user logged in successfully',
                        token: generateAccessToken(user.id, user.name)
                    });
                }
                else if(err){
                    throw new Error('something went wrong in bcrypt comparision');
                    return res.status(400).json({success:false,message:'password or email is incorrect'});
                }
            })
        }else{
            return res.status(200).json({ success: false, message: "user not exist"})
        }
    }catch(error){
        alert("server error")
        res.status(500).json({message:error,success:false})
    }
}

module.exports= { generateAccessToken};