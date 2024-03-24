const express=require('express')
const router=express.Router()

const groupController=require('../controllers/groups')
const authentication=require('../middleware/auth')

const cors=require('cors');
router.use(cors())
router.use(express.json());

router.post('/chat/creategroup',authentication, groupController.postGroupUser)
router.get('/chat/getgroup',authentication, groupController.getGroupUser)
// router.post('/chat/postgroup', authentication, groupUserController)

module.exports=router;