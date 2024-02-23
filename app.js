const express= require("express");
//const http= require('http');

const app= express();
const bodyParser= require('body-parser');
const path=require('path');
const cors= require("cors");
const sequelize= require('./util/tickTalk');
const userRouter= require('./routes/user')
const chatRouter= require('./routes/chat');

const User=require('./models/user');
const Chat=require('./models/chat');
app.use(cors());
app.use(express.json())
app.use(express.static(path.join(__dirname,'public','view')));
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended:false}))

app.use('/', userRouter)
app.use('/',chatRouter)

User.hasMany(Chat);
Chat.belongsTo(User);

sequelize.sync({ alter: true})
.then(()=>{
    app.listen(3000);
    console.log('Server is listening on port 3000');
;
})


