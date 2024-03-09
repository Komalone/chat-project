const Sequelize= require('sequelize');
const sequelize= new Sequelize("ticktalk", "root", "Kom@l111", {
    dialect: 'mysql',
    host: 'localhost'
});

sequelize.authenticate()
.then(()=>{
    console.log("authenticated")
})
.catch(err => console.log(err));

module.exports= sequelize;