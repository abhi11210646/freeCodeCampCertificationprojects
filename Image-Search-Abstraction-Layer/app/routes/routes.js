var router = require('express').Router();
var path = require("path");
var imageSearchController = require(path.join(__dirname,'..','controller','imageSearchController'));
module.exports = ()=>{
    router.get('/', (req, res)=>{
        res.render('index', { title: 'pug', message: 'Hello world!!' });
    });
    
    router.get('/imageSearch/:image_search', imageSearchController.imageSearch);
    router.get('/latest', imageSearchController.latestSearch);
    return router;
}