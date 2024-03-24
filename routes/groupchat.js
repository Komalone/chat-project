const express=require('express')
const router=express.Router()
const groupController=require('../controllers/groupChats')

const path=require('path')
const cors=require('cors');
router.use(cors())
router.use(express.json());

router.get('/chat/group',groupController.getAllGroupUser)

module.exports=router;