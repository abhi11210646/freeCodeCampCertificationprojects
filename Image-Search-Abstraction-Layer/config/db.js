var mongoose = require("mongoose");
module.exports = () =>{
    mongoose.connect(process.env.DB_Url, ()=>{
       console.log('connected');     
    });
    mongoose.connection.on('connected', ()=>{
       console.log("database started"); 
    });
}