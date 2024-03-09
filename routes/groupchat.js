const express=require('express')
const router=express.Router()
const chatController=require('../controller/chat')
const groupController=require('../controller/groupchat')

const path=require('path')
const cors=require('cors');
router.use(cors())
router.use(express.json());

router.get('/chat/group',groupController.getAllUser)

module.exports=router;