'use strict';
const googlePlace = require("place-search-sdk");
const Promise  = require("bluebird");
const passport = require("passport");
const mongoose = require("mongoose");
const searchHistory = mongoose.model('SearchResult');
const client = new googlePlace(process.env.API_KEY);
module.exports = {
    
    getResults :(req, res) =>{
        Promise.coroutine(function *(){
            let latLog = yield client.getGeoLocation(req.body.location);
            let searchResult = yield client.nearBySearch({geoCode: latLog, searchType: req.body.type});
            // console.log('yooy',searchResult);
            for(let search of searchResult) {
                yield searchHistory.findOneAndUpdate({placeId: search.placeId},{ $set:{placeId:search.placeId }}, {upsert:true}).exec();
                if(search.photo_reference) {
                   
                    let img_url = yield client.getPlaceImage(search.photo_reference);
                    search['photo_reference'] = '';
                    search['image'] = img_url;
                   
                }else {
                    search['image'] = '';
                }
                let gc = yield searchHistory.findOne({placeId: search.placeId}, {_id:0}).select('goingCount');
                search['goingCount'] = gc.goingCount;
            }
            return searchResult;
        }).apply(this)
        .then((response)=>{
            return res.status(200).send(response);
        }).catch((error)=>{
            return res.status(500).send({
                success: false,
                error: error.message
            });
        });
    },
    updateGoing: (req, res) =>{
          Promise.coroutine(function *(){
              let gc = yield searchHistory.findOne({placeId: req.body.placeId}).select('goingCount');
                gc.goingCount++;
              yield searchHistory.findOneAndUpdate({placeId: req.body.placeId},
                {
                    $set:{
                        goingCount:  gc.goingCount
                    }
                });
                return gc;
                }).apply(this)
            .then((response)=>{
                return res.status(200).send(response);
            }).catch((error)=>{
                return res.status(500).send({
                    success: false,
                    error: error.message
                });
        });
    },
    login: (req, res) =>{
         passport.authenticate('local.signin',{session:false},(err,user,info) =>{
             return Promise.coroutine(function *(){
                if(err)
                    throw err;
                if(!user)
                    throw err;
                return res.status(200).send(user);
                 }).apply(this)
                .catch((error)=>{
                return res.status(500).send({
                    success: false,
                    message: error.message
                });
            });
          })(req,res);
    },
    signUp: (req, res) =>{
         passport.authenticate('local.signup',{session:false},(err,user,info) =>{
             return Promise.coroutine(function *(){
                if(err)
                    throw err;
                return user;
                 }).apply(this)
                 .then((user)=>{
                     res.status(200).send(user);
                 })
                .catch((error)=>{
                return res.status(500).send({
                    success: false,
                    message: error.message
                });
            });
          })(req,res);
    }
};