function routes(app){
    app.use('/livros',  require('./routes/livros.js'));
    return;
}

module.exports = routes;