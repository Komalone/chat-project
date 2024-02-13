const express= require("express");
//const http= require('http');

const app= express();
const bodyParser= require('body-parser');
const path=require('path');
const cors= require("cors");
const sequelize= require('./util/tickTalk');
const userRouter= require('./routes/user')

app.use(cors());
app.use(express.json())
app.use(express.static(path.join(__dirname,'public','view')));
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended:false}))

app.use('/', userRouter)

sequelize.sync({ alter: true})
.then(()=>{
    app.listen(3000);
    console.log('Server is listening on port 3000');
;
})


