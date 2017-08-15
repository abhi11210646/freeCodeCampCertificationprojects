module.exports = (app) =>{
    
    app.use('/', require('./routes')());
    app.use((req, res, next)=>{
         res.status(404);
         res.send({ error: 'Not found', status: 404 });
    })
}