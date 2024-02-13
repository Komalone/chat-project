const Sequelize= require('sequelize');
const sequelize= new Sequelize("ticktalk", "root", "Kom@l11", {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports= sequelize;