const express=require('express')
const router=express.Router()
const path=require('path')
const cors=require('cors');

const authentication= require('../middleware/auth');
const chatController= require('../controllers/message')

router.use(cors())
router.use(express.json());
router.use(express.static(path.join(__dirname,'public')))
router.use(express.static(path.join(__dirname,'public','view')))

router.get('/chat',(req,res)=>{
    res.sendFile(path.join(__dirname,'..', 'public' ,'view','chatbox.html'))
})

router.post('/chat', authentication,chatController.postMessage)
router.get('/chat/user', authentication,chatController.getMessage)
router.get('/chat/group/:groupId', authentication, chatController.getGroupMessages);
router.get('/chat/user/:userId', authentication, chatController.getUserChats)

module.exports=router;