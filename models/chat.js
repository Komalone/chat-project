const Sequelize=require('sequelize')
const sequelize=require('../util/tickTalk')

const Chat=sequelize.define('chat',{
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
    },
    groupId: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    recipientId: {
        type: Sequelize.INTEGER,
        allowNull: true,
    }

})

module.exports= Chat;