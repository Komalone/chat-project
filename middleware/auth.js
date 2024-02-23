const jwt= require('jsonwebtoken');

const User= require('../models/user');

const authenticate= (req, res, next)=>{
    try{
        const token= req.header('Authorization');
        const user= jwt.verify(token, 'token9876354igjhf');
        console.log('user from auth file', user)
        User.findByPk(user.userId).then(user=>{
            req.user= user;
            next();
        }).catch(err=>{throw new Error(err)})
    }catch(err){
        console.log("error in auth middleware",err);
        return res.status(400).json({success: false})
    }
}

module.exports= authenticate