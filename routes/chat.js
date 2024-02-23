const express=require('express')
const router=express.Router()
const path=require('path')
const cors=require('cors');

const authentication= require('../middleware/auth');
const chatController= require('../controller/chat')

router.use(cors())
router.use(express.json());
router.use(express.static(path.join(__dirname,'public')))
router.use(express.static(path.join(__dirname,'public','html')))

router.get('/chat',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','html','chat.html'))
})

router.post('/chat', authentication,chatController.postChat)
router.get('/chat/user', authentication,chatController.getChat)

module.exports=router;