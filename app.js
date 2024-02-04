const express= require("express");
//const http= require('http');

const app= express();
const bodyParser= require('body-parser');
const path=require('path');
const cors= require("cors");

app.use(cors());
app.use(express.json())
app.use(express.static(path.join(__dirname,'public','html')))
app.use(bodyParser.urlencoded({extended:false}))

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});

