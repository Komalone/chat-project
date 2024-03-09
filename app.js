const express= require("express");
const http= require('http');
const socketIo= require('socket.io')
const AWS= require('aws-sdk');

const app= express();
const server= http.createServer(app);
const io= socketIo(server);
const bodyParser= require('body-parser');
const path=require('path');
const cors= require("cors");
const sequelize= require('./util/tickTalk');
const userRouter= require('./routes/user')
const chatRouter= require('./routes/chat');
const groupRouter=require('./routes/groups')

const User=require('./models/user');
const Chat=require('./models/chat');
const UserGroup= require('./models/userGroup');
const Group = require("./models/groups");
app.use(cors());
app.use(express.json())
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'public','view')));
app.use(bodyParser.urlencoded({extended:false}))

const s3= new AWS.S3({
    accessKeyId: 'YOUR_AWS_ACCESS_KEY',
    secretAccessKey: 'YOUR_AWS_SECRET_KEY'
})

io.on('connection', (socket)=>{
    console.log("user connected");

    socket.on('join-group', (groupId)=>{
        socket.join(groupId);
    })

    socket.on('new-message', (messageData) =>{
        io.to(messageData.groupId).emit('receive-message', messageData);
    });

    socket.on('disconnect', ()=>{
        console.log(" user disconnected")
    })
})

app.use('/', userRouter)
app.use('/',chatRouter)
app.use('/',groupRouter)

User.hasMany(Chat);
Chat.belongsTo(User);

User.hasMany(UserGroup);
UserGroup.belongsTo(User);

Group.hasMany(UserGroup);
UserGroup.belongsTo(Group);

Group.hasMany(Chat);
Chat.belongsTo(Group);

app.use((err, req, res, next)=>{
    console.error(err.stack);
    res.status(500).send('something broke!')
})

sequelize.sync({ alter: true})
.then(()=>{
    console.log('database schema');
;
})

server.listen(3000, ()=>{
    console.log('Server is listening on port 3000');
})


