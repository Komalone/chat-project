const groupUser= require('../models/group');
const userGroup= require('../models/userGroup');
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');


function generateAccessToken(id, name){
    return jwt.sign({userId: id, name: name}, 'nhhdhh8ivt5dc')
}

exports.postGroupUser= async(req, res)=>{
    try{   
        //console.log('backend create group',req.body);     
        const groupname=req.body.groupname;
        const adminName=req.user.name;
        const adminId=req.user.id;
        const members = req.body.members;   
    //    console.log("this is groupname>>>",groupname)
    //    console.log("this is groupMEMBERS>>>",members)
        if(groupname===undefined||groupname.length===0 || !members || members.length === 0)
        {
            return res.status(400).json({message:"Bad parameters or something is missing"})
        }      

        const data=await groupUser.create({
            name:groupname, 
            adminId: adminId,
            adminName: adminName,         
        });

        const groupID = data.id;
        const userGroupData = members.map(userId => ({
            groupId: groupID,
            userId: userId
        }));
       const groupdta= await userGroup.bulkCreate(userGroupData);

        console.log("this is groupdata>>>",groupdta)
      return  res.status(200).json({message:'new user created',createdgroupdata:data})
   
    }
    catch(err){
        console.log(err)
    return    res.status(500).json({error:"some error",err})
    }
}

exports.getGroupUser= async (req, res) => {
    try {
        const userId = req.user.id; // Assuming you have the user's ID in the request
        //console.log("User ID:", userId);

        const userGroups = await userGroup.findAll({ where: { userId } });
        //console.log("User Groups:", userGroups);

        const groupIds = userGroups.map(userGroup => userGroup.groupId);
        const groups = await groupUser.findAll({ where: { id: groupIds } });
      return  res.status(200).json({ allGroupData: groups });
       
    } catch (err) {
        console.log(err);
      return  res.status(500).json({ error: "Some error", err });
    }
};