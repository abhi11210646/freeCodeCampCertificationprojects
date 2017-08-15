const router = require("express").Router();
const nightlifecontroller = require("./../controller/nightlifecontroller");
module.exports = () =>{
    router.post('/', nightlifecontroller.getResults);
    router.post('/updateGoing', nightlifecontroller.updateGoing);
    router.post('/login', nightlifecontroller.login);
    router.post('/signUp', nightlifecontroller.signUp);
    return router;
};