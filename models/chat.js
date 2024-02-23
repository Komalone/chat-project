const Sequelize=require('sequelize')
const sequelize=require('../util/tickTalk')

const Chat=sequelize.define('chatbox',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
        unique:true
    },   
    message:{
        type:Sequelize.STRING,   
        allowNull:false,
    }  

})

module.exports= Chat;