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
    groupname:{
        type:Sequelize.STRING,   
        allowNull:false,
    },  
    createdby:{
        type:Sequelize.STRING, 
        allowNull:false,  
       
    }

})

module.exports=Group;