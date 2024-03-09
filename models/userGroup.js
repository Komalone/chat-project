const Sequelize=require('sequelize')
const sequelize=require('../util/tickTalk')

const usergroup=sequelize.define('usergroup',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
        unique:true
    },   
})

module.exports=usergroup;