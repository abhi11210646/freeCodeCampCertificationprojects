var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const historySchema = new Schema({
    
    term:{
        "type": String,
        "trim": true,
    },
    when:{
        "type": Date,
        "default":  Date(Date.now())
    }
    
},{ versionKey: false });

module.exports = mongoose.model('History', historySchema);