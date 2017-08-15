const imageSearch = require('image-search-google');
var client = new imageSearch(process.env.cse_id, process.env.apikey);
var History = require('mongoose').model('History');
var option ={};
module.exports = {
    
    imageSearch: (req, res) =>{
        if(req.params['image_search']) {
            if(req.query['offset']) option = {page:req.query['offset'] };
            client.search(req.params['image_search'], option).then((images) => {
                var history = new History({term: req.params['image_search']});
                history.save();
                res.render('imageResult', {result:JSON.stringify(images)});
                }).catch((error)=>{
                    console.log('client search error--->>',error);
                    res.json({"error":error.statusCode,'message':error.statusMessage});
                });
        }else {
            res.json({'message':'nothing found'});
        }
    },
    latestSearch: (req, res)=>{
        History.find({},{_id:0,term:1, when:1}).limit(10).sort({when:-1}).then((result)=>{
             res.json(result);
        });
       
    }
    
};
