const Sequelize=require('sequelize')
const sequelize=require('../util/tickTalk')

const Message=sequelize.define('message',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
        unique:true
    },   
    text:{
        type:Sequelize.STRING,   
        allowNull:false,
    },
    groupId: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    receiverId: {
        type: Sequelize.INTEGER,
        allowNull: true,
    }

})

module.exports= Message;