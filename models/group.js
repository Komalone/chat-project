const Sequelize=require('sequelize')
const sequelize=require('../util/tickTalk')

const Group=sequelize.define('group',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
        unique:true
    },   
    name:{
        type:Sequelize.STRING,   
        allowNull:false,
    },  
    adminId:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    adminName:{
        type:Sequelize.STRING, 
        allowNull:false,  
       
    }

})

module.exports=Group;