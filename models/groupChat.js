const Sequelize=require('sequelize')
const sequelize=require('../util/chat')

const GroupChat=sequelize.define('groupchat',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
        unique:true
    },   
    groupname:{
        type:Sequelize.STRING,   
        allowNull:false,
    }  

})

module.exports=GroupChat;