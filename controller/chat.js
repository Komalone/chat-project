const express= require('express');
const router= express.Router()

const Chat= require('../models/chat');
const User= require('../models/user');
const sequelize=require('../util/tickTalk')
const path=require('path')
const cors=require('cors');
router.use(cors())
router.use(express.json());

exports.postChat=async (req, res)=>{
    const t= await sequelize.transaction();
    try{
        const message= req.body.message;

        const data= await Chat.create({
            message: message,
            userId :req.user.id
        }, {transaction: t});

        const user= await User.findByPk(req.user.id);
        if(!user){
            throw new Error('User not found');
        }
        await t.commit();
        res.status(201).json({ message : data})
    }catch(err){
        console.log('in chat controller', err);
        await t.rollback()
        res.status(500).json({error: err})
    }
}

exports.getChat=async (req,res)=>{
    try{
        const chatdata= await Chat.findAll({
            where:{userId:req.user.id}
        })
        res.status(200).json({allChatData:chatdata})
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:err})
    }
}