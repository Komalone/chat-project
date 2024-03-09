const express= require('express');
const router= express.Router()
const Sequelize= require('sequelize');

const Chat= require('../models/chat');
const User= require('../models/user');
const UserGroup= require('../models/userGroup')
const sequelize=require('../util/tickTalk')
const path=require('path')
const cors=require('cors');
router.use(cors())
router.use(express.json());

exports.postChat=async (req, res)=>{
    const t= await sequelize.transaction();
    try{
        const message= req.body.message;
        const chatId = req.body.chatId
        const groupId = req.body.groupId;
        const recipientId=req.body.recipientId

        if(req.files && req.files.file){
            const file= req.files.file;
            const s3Params={
                Bucket: 'S3_BUCKET_NAME',
                Key: Date.now()+ '-' + file.name,
                Body: file.data
            };

            const s3Response= await s3.upload(s3Params).promise();
            const fileURL= s3Response.Location;
        }

        const data= await Chat.create({
            message: message,
            userId :req.user.id,
            chatId: chatId,
            groupId: groupId,
            recipientId:recipientId
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

exports.getGroupMessages= async(req, res)=>{
    const groupId= req.params.groupId;
    const userId= req.user.id;

    try{
        const userGroupMembership = await UserGroup.findOne({
            where:{
                groupId: groupId,
                userId: userId
            }
        });

        if (!userGroupMembership) {
            return res.status(403).json({ message: "User is not a member of the requested group." });
        }

        const messages = await Chat.findAll({
            where: {
                groupId: groupId
            },
            include: [{ model: User, attributes: ['name'] }]
        });

      return  res.status(200).json({ messages: messages });
    }catch(err){
        console.log(err);
        return res.status(500).json({error: err});
    }
}

exports.getUserChats= async(req, res)=>{
    try {
        const userId = req.user.id; // Current logged-in user's ID
        const otherUserId = req.params.userId; // ID of the other user

        const chatData = await Chat.findAll({
            where: {
                [Sequelize.Op.or]: [
                    { userId: userId, recipientId: otherUserId },
                    { userId: otherUserId, recipientId: userId }
                ]
            },
            order: [['createdAt', 'ASC']] 
        });

        return res.status(200).json({ messages: chatData });
    } catch (err) {
        console.log(err);
      return  res.status(500).json({ error: err });
}
}