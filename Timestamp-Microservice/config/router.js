var router = require("express").Router();
var path = require('path');
module.exports = () =>{
    
    router.get('/:date', function(req, res) {
        var sendResponse = {'unix': null,'natural': null};
        
        
        if(isNaN(Number(req.params.date)))
        {
            var date = new Date(req.params.date);
            if(!isNaN(date.getTime())){
                sendResponse.unix = date.getTime() / 1000;
                sendResponse.natural = req.params.date;
                res.json(sendResponse);
            }else {
                res.json(sendResponse);
            }
            
        }else{
            var date = new Date(req.params.date * 1000);
            var month = ['January','February', 'March','April','May','June','July','August','September','October','November','December'];
            sendResponse.unix = req.params.date;
            sendResponse.natural = month[date.getMonth()]+' '+ date.getDate()+', '+date.getFullYear();
            res.json(sendResponse);
        }
        });
        
    router.get('/', function(req, res){
            res.sendFile(path.join(__dirname,'..','view','index.html'));
        });
        
        return router;
}