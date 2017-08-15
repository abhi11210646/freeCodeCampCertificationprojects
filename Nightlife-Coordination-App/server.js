require("dotenv").config();
const path = require("path");
const cors =require("cors");
const express = require("express");
const passport = require("passport");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

require(path.join(__dirname,'config','db'))();
require(path.join(__dirname,'model','history'));
require(path.join(__dirname,'model','user'));
require(path.join(__dirname,'config','passport','local'));
require("./routes")(app);

app.use(express.static(path.join(__dirname,'client','dist')));
app.listen(process.env.PORT, ()=>{
   console.log('server running on.. ', process.env.PORT, 'port'); 
});