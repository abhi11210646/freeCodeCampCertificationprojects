var routerV1 = require("./router");

module.exports = (app) => {
    
    app.use('/', routerV1());
    
};