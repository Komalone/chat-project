const express=require('express')
const router=express.Router()
const path=require('path')
const cors=require('cors');
const sequelize= require('../util/tickTalk');
const authentication= require('../middleware/auth');
const chatController= require('../controller/chat')

router.use(cors())
router.use(express.json());
router.use(express.static(path.join(__dirname,'public')))
router.use(express.static(path.join(__dirname,'public','html')))

router.get('/chat',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','html','chat.html'))
})

router.post('/chat',chatauthentication.authenticate,chatController.userChat)


module.exports=router;