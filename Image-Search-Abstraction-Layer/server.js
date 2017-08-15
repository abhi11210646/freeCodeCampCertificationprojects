const path =       require('path');
const dotenv =     require('dotenv').config();
const express =    require('express');
const bodyParser = require("body-parser");
const app  =       express();
const homePath =   path.join(__dirname,'app');
const db =       require(path.join(__dirname,'config', 'db'))();
const hstory=    require(path.join(homePath, 'model','history'));
const routes=    require(path.join(homePath,'routes'))(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('views',path.join(homePath,'views'));
app.set('view engine', 'pug');
app.listen(process.env.PORT,()=>{
    console.log("process listening on PORT", process.env.PORT);
})