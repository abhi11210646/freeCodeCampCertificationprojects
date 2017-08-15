'use strict';
const LocalStrategy = require('passport-local').Strategy;
const Promise  = require("bluebird");
const passport =require("passport");
const mongoose = require("mongoose");
const User  = mongoose.model('User');
const config = {
    usernameField : 'email',
    passwordField: 'password',
    passReqToCallback: true
};
function localStratagyAuth(req, email, password, next) {
    Promise.coroutine(function * () {
        let user = yield User.findOne({'email':email});
        if(!user)
            throw new Error("User doesn't exit.");
        if(user && !user.validPassword(password))
            throw new Error('Wrong Password');
        return user;
    })()
    .then((response)=>{
        return next(null, response, {});
    })
    .catch((err)=>{
        return next(err, false, {});
    });
}
function localsignUpStratagyAuth(req, email, password, next) {
    Promise.coroutine(function * () {
        let user = yield User.findOne({'email':email});
        if(user)
            throw new Error("User Already exit.");
        let newUser = new User(req.body);
        newUser.password = newUser.encryptPassword(password);
        return yield newUser.save();
    })()
    .then((response)=>{
        return next(null, response, {});
    })
    .catch((err)=>{
        return next(err, false, {});
    });
}
const localSignIn = new LocalStrategy(config, localStratagyAuth);
const localSignUp = new LocalStrategy(config, localsignUpStratagyAuth);
passport.use('local.signin',localSignIn);
passport.use('local.signup',localSignUp);
module.exports = {localSignIn, localSignUp};