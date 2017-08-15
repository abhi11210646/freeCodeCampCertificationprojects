var express = require("express");
require('dotenv').config();
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.get('/', (req, res)=>{
    res.json({"ipaddress":req.headers['x-forwarded-for'], "language":req.headers['accept-language'].split(',')[0], "software":req.headers['user-agent']});
});
app.use((req, res, next)=>{
         res.status(404);
         res.send({ error: 'Not found', status: 404 });
    });
app.listen(process.env.PORT,()=>{
    console.log("server running on PORT ", process.env.PORT);
});