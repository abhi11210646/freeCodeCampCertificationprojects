const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
var userSchema = new mongoose.Schema({
    name:{
        type: String
    },
    password:{
        type: String
    },
    email:{
        type:String
    }
});

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};
userSchema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};
module.exports = mongoose.model('User',userSchema);