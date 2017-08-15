require('dotenv').config();
var express = require("express");
var app  = express();
var bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
var routers = require('./config')(app);
app.listen(process.env.PORT, function() {
    console.log("server started on port" + process.env.PORT);
});
